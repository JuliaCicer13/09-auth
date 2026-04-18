import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new note",
  description: "Creating new note for our app store",
      openGraph: {
        title: `Create new note here`,
        description: "You can create new note easy here with us",
        url: `https://notehub.com/notes/action/create`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
            width: 1200,
            height: 630,
            alt: "Note Hub",
          },
        ],
        type: 'article',
      },
};
export default function NotePage (){ 
  
      return (
      <>
         <NoteForm/>
      </> 
      ) 
   }
