import Image from 'next/image';
import calendar from '@/public/image/calendar.png';

const AddMeetingBanner = () => {
  return (
    <div className="p-3 bg-white rounded-lg border">
        <div className='flex flex-col-reverse md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4'>

        
      <div className="md:w-3/5 md:pr-10">
        <h2 className="text-[28px] md:text-[36px] font-bold text-gray-800 mb-4">
          Admin - Meetings
        </h2>
        <p className="text-gray-600 leading-relaxed text-[19px] md:text-base">
          The Meetings component of the Admin module enables Admins to schedule,
          manage, and track strategy meetings efficiently. It provides tools to create,
          edit, and delete meetings, with any updates reflecting in the Meetings module
          for users. Once created, users can add or edit agendas, monitor meeting
          progress, and stay aligned with key action items, ensuring seamless
          collaboration across teams.
        </p>
      </div>
      <div className="md:w-2/5 mt-6 md:mt-0 flex justify-center">
        {/* Placeholder image. Replace 'your-image-path.png' with your actual image path */}
        <Image
          src={calendar}
          alt="Calendar illustration"
          width={400}
          height={400}
          className="w-full h-auto max-w-xs"
        />
      </div>
    </div>
    </div>
  );
};

export default AddMeetingBanner;