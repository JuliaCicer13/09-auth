import EditProfile from '@/components/EditProfilePage/EditProfilerPage';
import { updateMe } from '@/lib/api/clientApi';
import { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from  "@tanstack/react-query";

type Props = {
 params: Promise<{id: string[]}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {id} = await params;
  const user = await updateMe(username)
  
    return {
      title: `Username: ${user.username}`,
      description: `Email: ${user.email}`,
      openGraph: {
        title: `Username: ${user.username}`,
        description:  `Email: ${user.email}`,
        url: `https://notehub-api.goit.study${id}`,
        siteName: 'NoteHub',
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
            width: 1200,
            height: 630,
          },
        ],
        type: 'profile',
      },
}
}
const Profile = async ({params}: Props) => {
  const {id} =  await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", id],
    queryFn: () => updateMe(payload),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProfile/>
   </HydrationBoundary>
};

export default Profile;



