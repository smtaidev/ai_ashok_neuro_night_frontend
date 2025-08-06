import { isLoggedIn } from '@/services/auth.service';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const isUser = isLoggedIn() as any;

  if (!isUser) {
    return redirect('/login');
  } else {
    redirect('/dashboard/overview');
  }
}
