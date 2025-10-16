'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages where navbar should not be shown
  const noNavbarPages = ['/', '/auth/signin', '/auth/register'];
  const showNavbar = !noNavbarPages.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
