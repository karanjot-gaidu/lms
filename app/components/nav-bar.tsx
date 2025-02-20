'use client';

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-blue-700" : "";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ClassroomAI</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/courses" 
              className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/courses')}`}
            >
              Courses
            </Link>
            <Link 
              href="/assignments" 
              className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/assignments')}`}
            >
              Assignments
            </Link>
            <Link 
              href="/practice" 
              className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/practice')}`}
            >
              Practice
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}