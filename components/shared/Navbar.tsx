"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/public/assets/logo.png";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { LuTwitter } from "react-icons/lu";
import { FiLinkedin, FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const MainNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  // const { role, id, email, userName, password, companyName } = getUserInfo() as any;

  // console.log("User Role:", role);
  // console.log("User ID:", id);
  // console.log("User Email:", email);
  // console.log("User Name:", userName);
  // console.log("User Password:", password);
  // console.log("User Company Name:", companyName);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const animatedUnderlineStyle = `
    .animated-underline::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0%;
      height: 1px;
      background-color: #2563eb;
      border-radius: 2px;
      transition: width 0.3s ease-in-out;
    }
    .animated-underline:hover::after {
      width: 100%;
    }
  `;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/solutions", label: "Solutions" },
    { to: "/pricing", label: "Pricing" },
    { to: "/get-a-demo", label: "Get a Demo" },
  ];

  const linkBaseClass =
    "text-lg font-medium block relative transition-colors duration-200 animated-underline";

  const isActive = (to: string) => pathname === to;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animatedUnderlineStyle }} />
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" onClick={closeDropdown}>
            <Image src={Logo} alt="Logo" width={120} height={120} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    onClick={closeDropdown}
                    className={`${linkBaseClass} ${isActive(link.to)
                        ? "text-blue-600 border-b font-semibold"
                        : "text-black hover:text-blue-600"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Button */}
          <div className="hidden lg:flex gap-3">
            <Link
              href="get-a-demo"
              className="btn outline-1 rounded-full px-6 py-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Support
            </Link>
            {
              isLoggedIn ? (
                <Link href='dashboard/overview' className="btn text-white hover:outline-1 rounded-full px-6 py-2  bg-blue-600  hover:bg-white hover:text-blue-600 transition-colors duration-200">Dashboard</Link>
              ) : <Link href='login' className="btn text-white hover:outline-1 rounded-full px-6 py-2  bg-blue-600  hover:bg-white hover:text-blue-600 transition-colors duration-200">Login</Link>
            }
          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleDropdown}
              aria-label={isDropdownOpen ? "Close menu" : "Open menu"} // ✅ CHANGE
              className="cursor-pointer"
            >
              {isDropdownOpen ? <RxCross2 size={30} /> : <FiMenu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isDropdownOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 sm:px-6 z-50">
            <ul className="flex flex-col gap-2 ml-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    onClick={closeDropdown}
                    className={`text-lg font-medium py-2 block transition-colors duration-200 ${isActive(link.to)
                        ? "text-blue-600 font-semibold"
                        : "text-gray-800 hover:text-blue-600"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-6 my-6 ml-4">
              {[
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/clarhethq/",
                },
                { icon: <LuTwitter />, link: "https://x.com/ClarhetHQ" },
                {
                  icon: <FiLinkedin />,
                  link: "https://ca.linkedin.com/company/clarhethq",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col text-center gap-4 items-center px-4">
              <Link
                href="get-a-demo"
                className="btn w-full outline-1 rounded-full py-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Support
              </Link>
              {/* {
                isUser ? (
                  <Link href='dashboard/overview' className="btn text-white hover:outline-1 rounded-full px-6 py-2  bg-blue-600  hover:bg-white hover:text-blue-600 transition-colors duration-200">Dashboard</Link>
                ) : <Link href='login' className="btn text-white hover:outline-1 rounded-full px-6 py-2  bg-blue-600  hover:bg-white hover:text-blue-600 transition-colors duration-200">Login</Link>
              } */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainNavbar;
