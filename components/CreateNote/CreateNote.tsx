"use client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import css from "../CreateNote/CreateNote.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { createNote } from "../../lib/api";
import type { CreateNotePayload } from "../../lib/api";

export default function CreateNote () {
   const queryClient = useQueryClient();
   
   const {mutate: createNoteM} = useMutation({
      mutationFn: (payload: CreateNotePayload) => createNote(payload),
      onSuccess: () => {
       queryClient.invalidateQueries({queryKey: ["notes"]})
      }
 })

    return ( 
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	      <NoteForm/>
  </div>
</main>
    )
}
