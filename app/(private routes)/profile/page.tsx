import ProfilePage from '@/components/ProfilePage/ProfilePage';
import { getServerMe } from '@/lib/api/serverApi';


const Profile = async () => {
  const user = await getServerMe();

  console.log('USER', user);
  
  return <ProfilePage user={user}/>

};

export default Profile;



