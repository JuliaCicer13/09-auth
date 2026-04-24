import ProfilePage from '@/components/ProfilePage/ProfilePage';
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {

  const user = await getServerMe()

    return {
      title: `Profile: ${user.username}`,
      description: `User Email: ${user.email}`,
    };
 }

const Profile = async () => {
    const user = await getServerMe()
  return <ProfilePage user={user}/>

};

export default Profile;



