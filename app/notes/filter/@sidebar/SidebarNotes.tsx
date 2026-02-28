"use client";

import Link from 'next/link';
import { TAGS } from '@/constants/tags';
import css from '@/SidebarNoteClients.module.css';

const SidebarNotes = () => {
  return (
    <ul className={css.wrapper}>
      <li className={css.linkClient}>
        <Link className={css.linkLink}  href={`/notes/filter/all`}>All notes</Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>
          {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;