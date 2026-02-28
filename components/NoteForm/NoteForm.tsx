'use client';
import css from "../NoteForm/NoteForm.module.css"
import { useId } from "react";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import {createNote} from "../../lib/api"
import { useNoteDraftStore } from "@/lib/store/noteStore";
import Loader from "@/app/loading"
import { useRouter } from 'next/navigation';



export default function NoteForm () {
const router = useRouter();
const queryClient = useQueryClient();
const fieldId = useId();
const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

const {mutate, isPending} = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    clearDraft();
    queryClient.invalidateQueries({queryKey: ["notes"]});
     router.push('/notes/action/create');
  },
});


const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as {
      title: string;
      content: string;
      tag: string;
    };
      mutate(values);
};
 const handleCancel = () => router.back();

return (
  <>
     <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        <h2 className={css.text}>Title</h2>
        <input 
           className={css.input} 
           type="text" name="title" 
           defaultValue={draft.title} 
           onChange={handleChange} />
      </label>

      <label htmlFor="content"className={css.label}>
            <h2 className={css.text}>Content</h2>
        <textarea 
          className={css.textarea} 
          name="content" defaultValue={draft.content} 
          onChange={handleChange}>
        </textarea>
      </label>

  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-tag`}>Tag</label>
    <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft.tag} onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={handleCancel}> Cancel</button>
    <button type="submit" className={css.submitButton} disabled={isPending}>
      {isPending ? <Loader/> : "Create note"}
    </button>
  </div>
  </form>
  </>

  )}