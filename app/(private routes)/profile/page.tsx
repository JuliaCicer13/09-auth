import ProfilePage from '@/components/ProfilePage/ProfilePage';
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import { User } from "@/types/user";

type Props = {
  user: User;
};

export async function generateMetadata({}: Props): Promise<Metadata> {

  const user = await getServerMe()
  
    return {
      title: `Profile: ${user.username}`,
      description: `User Email: ${user.email}`,
    };
 }

const Profile = ({user}: Props) => {

  return <ProfilePage user={user}/>

};

export default Profile;



