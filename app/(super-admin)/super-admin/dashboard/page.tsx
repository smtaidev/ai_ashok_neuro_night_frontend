

import { redirect } from 'next/navigation';
import AdminDashboard from './admin/_components/AdminDashboard';

export default async function Dashboard() {
  // const isUser = true;

  // if (!isUser) {
  //   return redirect('/login');
  // } else {
  //   redirect('/super-admin/dashboard/overview');
  // }

  return (
    <div className='p-6'>
      <AdminDashboard />
    </div>
  )
}
