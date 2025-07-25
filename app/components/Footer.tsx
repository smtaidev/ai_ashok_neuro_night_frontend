import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from '@/public/assets/logo.png';
import Image from 'next/image';



const socialLinks = [
  {
    Icon: FaTwitter,
    url: "https://x.com/ClarhetHQ",
    label: "Twitter",
  },
  {
    Icon: FaInstagram,
    url: "https://www.instagram.com/clarhethq/",
    label: "Instagram",
  },
  {
    Icon: FaLinkedinIn,
    url: "https://ca.linkedin.com/company/clarhethq",
    label: "LinkedIn",
  },
];


const Footer = () => {
  return (
    <footer className="pt-10  bg-base-100 text-gray-600">
      {/* Main Content Wrapper */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 gap-8 pb-10 ">
        {/* Brand Info Section */}
        <div className="col-span-1">
         <Image src={Logo} alt="Logo" width={120} height={120} />
          <p className="text-footerText mt-4 text-sm leading-relaxed max-w-sm mb-6">
            The only platform for seamless strategy development, communication, and translation into strategic actions.
          </p>
          

<div className="flex space-x-4">
  {socialLinks.map(({ Icon, url, label }, i) => (
    <a
      key={i}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-800 transition-colors duration-200"
      aria-label={label}
    >
      <Icon className="text-lg" />
    </a>
  ))}
</div>




        </div>

        {/* Navigation Sections */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Product', links: ['Solutions', 'Pricing'] },
              { title: 'Get Started', links: ['Get a demo'] },
              { title: 'Company', links: ['About Us', 'Contact Us'] },
              { title: 'Get Started', links: ['Login'] }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-footerSectionTitle font-bold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="inline-block text-sm md:text-base duration-300 hover:translate-x-1 hover:scale-95"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='w-full pb-5 bg-[#ECECEC] px-4 pt-5'>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-footerBottomText text-sm">
        <p className="pb-2 md:mb-0">Copyright © 2025 All Rights Reserved</p>
        <div className="flex space-x-4">
          {['Privacy Policy', 'Terms & Conditions'].map((text, idx) => (
            <React.Fragment key={idx}>
              {idx !== 0 && <span>|</span>}
              <a
                href="#"
                className="group text-sm md:text-base link-hover duration-300 group-hover:translate-x-1 group-hover:scale-95"
              >
                {text}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
