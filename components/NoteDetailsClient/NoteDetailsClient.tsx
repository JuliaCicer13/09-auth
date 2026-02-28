"use client";

import css from "./NoteDetailsClient.module.css";
import { useRouter } from 'next/navigation';

const NoteDetailsClient = () => {
     const router = useRouter();
	 const handleGoBack = () => {
         const isSure = confirm('Are you sure?');
          if (isSure) {
            router.back();
           }
	 };
    <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
		 <button onClick={handleGoBack}>Back</button>
	    <h2>Note title</h2>
	  </div>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>Created date</p>
	</div>
</div>
}

export default NoteDetailsClient;