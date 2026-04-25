'use client'

import css from "@/components/EditProfilePage/EditProflePage.module.css";
import { useState, useEffect } from 'react'
import { getMe, updateMe,} from '@/lib/api/clientApi';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile =  () => {
    const router = useRouter();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');


  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setEmail(user.email ?? '');
    });
  }, []);

 const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username: userName,});

      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
       <h1 className={css.formTitle}>Edit Profile</h1>
       
       <Image src={photoUrl || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
       alt="User Avatar"
       width={120}
       height={120}
       className={css.avatar}
     />
      <form className={css.profileInfo} onSubmit={handleSaveUser}>
       <div className={css.usernameWrapper}>
         <label htmlFor="username">Username:</label>
         <input id="username" 
               type='text' 
               className={css.input} 
               value={userName}
               onChange={(e) => setUserName(e.target.value)} />
       </div>
        <p>Email: {email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button 
            type="button" 
            className={css.cancelButton}
            onClick={() => router.push('/profile')}>
          Cancel
        </button>
      </div>
      </form>
    </div>
</main>
   
  )
  
};

export default Profile;



