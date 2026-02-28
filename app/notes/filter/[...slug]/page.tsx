import { QueryClient, HydrationBoundary, dehydrate } from  "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const {slug} = await params;
   const tag = slug?.[0] ?? "all";

   const titleTag = tag === "all" ? "All notes" : `Notes: ${tag}`;

    return {
      title: titleTag,
      description: `Browse ${tag} notes in NoteHub`,
      openGraph: {
        title: titleTag,
        description: `Browse ${tag} notes in NoteHub`,
        url: `https://notehub.com/notes/filter/${tag}`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
        type: 'article',
      },
}
}

export default async function NotePage ({ params }: Props) {
   const queryClient = new QueryClient();
   const {slug} = await params;


   return <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={slug[0]}/>
   </HydrationBoundary>
}