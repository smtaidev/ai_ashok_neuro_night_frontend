import React from 'react';
import Image from "next/image";
import image from '@/public/image/Alignment-Check-img.svg';
const AlignmentHeader = () => {
    return (
        <div>
              {/* Alignment Check Section */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Text */}
          <div>
            <h2 className="text-[26px] font-bold text-gray-900 mb-3">
              Alignment Check
            </h2>
            <p className="text-[17px] text-gray-700 mb-3">
              The Alignment Check is a collaborative process that ensures teams
              are aware of the current landscape and internal and external
              factors that could impact the company’s current and future
              direction. It fosters the shared development of strategic
              directions and ensures that teams and decision-makers are on the
              same page. Importantly, stakeholders review and either approve or
              offer suggestions, nurturing a sense of shared responsibility and
              active participation.
            </p>
            <p className="text-[17px] text-gray-700">
              Its primary purpose is to ensure that everyone is aligned and
              understands the strategic directions chosen by the organization.
            </p>
          </div>
          {/* Icon */}
          <div className="flex justify-center">
            <Image src={image} alt="alignment" width={400}/>
          </div>
        </div>
      </div>
        </div>
    );
};

export default AlignmentHeader;