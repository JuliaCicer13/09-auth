import EditProfile from '@/components/EditProfilePage/EditProfilerPage';
import { updateMe } from '@/lib/api/clientApi';
import { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from  "@tanstack/react-query";
import { User } from "@/types/user";

type Props = {
  user: User;
};

export async function generateMetadata({}: Props): Promise<Metadata> {

  const user = await updateMe(id)
  
    return {
      title: `Username: ${user.username}`,
      description: `Email: ${user.email}`,
}
}
const Profile = async ({}: Props) => {
 
  const queryClient = new QueryClient();
  const user = await updateMe(usider)
  
  await queryClient.prefetchQuery({
    queryKey: ["users", user],
    queryFn: () => updateMe(id),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProfile/>
   </HydrationBoundary>
};

export default Profile;



