import Image from 'next/image'
import Link from 'next/link'
import notfoundImage from "@/public/assets/not_found.svg"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-400px)] flex  items-center justify-center bg-white px-4 ">
      <div className="max-w-6xl gap-10 flex flex-col lg:flex-row-reverse mx-auto">
        <div>
        <Image
          src={notfoundImage}
          alt="Not Found"
          className="w-full max-w-sm mx-auto"
        />

        </div>
        <div className='text-center lg:text-start'>

        <h2 className="text-3xl md:text-5xl mb-6 font-bold text-blue-600">404</h2>
        <p className="text-gray-600 mb-4 font-bold text-xl">
          Oops! We couldn't find this page.
        </p>
        <p className='text-sm font-thin text-gray-500 mb-6'>Don't worry, you can return to the homepage or explore other pages</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
        </div>
      </div>
    </div>
  )
}
