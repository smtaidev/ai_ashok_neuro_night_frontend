import Image from 'next/image';
import React from 'react';
import adminImage from "@/public/image/user-management.png"
import Button from '@/components/reusable-button/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="">
        {/* Main Content Card */}
        <div className="bg-white border rounded-lg p-8">
          
          {/* Image Centered */}
          <div className="flex justify-center max-w-4xl mx-auto  mb-6">
            <Image
              src={adminImage}
              alt="Admin Module"
              width={450}
              height={205}
              className=""
            />
          </div>
          
          {/* Welcome Text */}
          <div className="text-center max-w-4xl mx-auto  space-y-4">
            <p className="text-gray-700 text-base leading-relaxed">
              <span className="font-semibold">Welcome to the Admin module!</span> Here, you can easily manage all your vital information. This 
              module covers everything from updating business functions, user management, and 
              strategy meetings to storing human resources and financial data.
            </p>
            
            <p className="text-gray-700 text-base leading-relaxed">
              You can also securely handle payment information, including invoices and banking or credit card details. 
              Designed to ensure streamlined control and organization, the Admin module keeps everything in order.
            </p>
          </div>
          
          {/* Add User Button */}
          <div className="flex justify-end mt-8">
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
