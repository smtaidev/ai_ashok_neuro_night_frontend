// import { UserProfile } from '@clerk/nextjs';

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col p-4'>
      {/* <UserProfile /> */}
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Profile</h1>
        <p className='text-sm text-gray-500'>Manage your profile settings</p>
      </div>
    </div>
  );
}
