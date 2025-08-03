import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // const { userId } = await auth();
  const userId = true; // TODO: remove this line and uncomment the above line to use Clerk authentication

  if (!userId) {
    return redirect('/auth/sign-in');
  } else {
    redirect('/dashboard/overview');
  }
}
