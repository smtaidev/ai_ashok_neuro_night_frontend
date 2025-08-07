
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const isUser = true;

  if (!isUser) {
    return redirect('/login');
  } else {
    redirect('/dashboard/overview');
  }
}
