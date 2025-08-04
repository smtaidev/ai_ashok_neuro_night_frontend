import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import { TbBellRinging2 } from "react-icons/tb";

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center bg-[#22398A] justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1 text-white' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        {/* <div className='hidden md:flex'>
          <SearchInput />
        </div> */}
        <TbBellRinging2 className='text-white size-8' />
        <UserNav />
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
}
