import css from "../../../components/ProfilePage/ProfilePage.module.css";
import Link from 'next/link';
import { User } from "@/types/user";

type Props = {
  user: User;
};

const ProfilePage = ({user}: Props) => {
 return (
    <>
<main className={css.mainContent}>
  <div className={css.profileCard}>
    <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
       <button type="button">
         <Link href="/profile/edit">Edit profile</Link>
       </button>
	   </div>
     <div className={css.avatarWrapper}>
      <img
        src="Avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username:{user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
    </>
 )
}

export default ProfilePage;