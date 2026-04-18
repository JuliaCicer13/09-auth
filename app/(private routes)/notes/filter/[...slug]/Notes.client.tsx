"use client";
import { fetchNotes } from "@/lib/api";
import { useState } from 'react'
import SearchBox from "@/components/SearchBox/SearchBox";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import {Toaster} from "react-hot-toast";
import Pagination from '@/components/Pagination/Pagination';
import SidebarNotes from "../@sidebar/default";
import Link from 'next/link';

 type NotesClientProps = {
      tag: string;
}

export default function NotesClient({tag}: NotesClientProps) {
  const [search, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);



  const handleSearch = useDebouncedCallback(
    (value:string) => {
    setSearchQuery(value);
    setPage(1);
   },
    500
  );

  const { data, isSuccess} = useQuery({
    queryKey: ['notes', search, page,tag],
    queryFn: () => fetchNotes(search, page,tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
   
    const results = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;

return (
 <div>
  <header>
      <Link href="/notes/action/create">Create note</Link>
    <SearchBox value={search} onChange={handleSearch}/>
    <SidebarNotes/>
    {isSuccess && totalPages > 1 && (
      <Pagination
        totalPages={totalPages}
        page={page}
        onPageChange={setPage}
      />
    )}
  
  </header>
    {isSuccess && results.length > 0 && ( <NoteList notes={results}/>)}
     <Toaster position="top-right" reverseOrder={false}/>
</div>
   
  )
}