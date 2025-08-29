
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // const isUser = true;

  // if (!isUser) {
  //   return redirect('/login');
  // } else {
  //   redirect('/super-admin/dashboard/overview');
  // }

  return (
    <div className='p-6'>
      <h1>This is super admin dashboard page</h1>
    </div>
  )
}
