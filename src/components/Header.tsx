'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  avatarUrl?: string;
}

export default function Header({ avatarUrl }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-gradient-to-r from-pink-50 to-white border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="Kho Vải Hân Hân"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-pink-600">
                  <circle cx="20" cy="15" r="6" fill="currentColor" />
                  <path d="M8 35 Q8 25 20 25 Q32 25 32 35" fill="currentColor" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <div className="text-pink-600 font-semibold text-xl tracking-wide group-hover:text-pink-700 transition-colors">KHO VẢI HÂN HÂN</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                isActive('/') 
                  ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-md' 
                  : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600'
              }`}
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                isActive('/about') 
                  ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-md' 
                  : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600'
              }`}
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                isActive('/contact') 
                  ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-md' 
                  : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600'
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#3d3226] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
            <nav 
              ref={menuRef}
              className="absolute top-16 right-4 w-40 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-pink-100 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-pink-100">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Kho Vải Hân Hân"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 40 40" className="text-pink-600">
                    <circle cx="20" cy="15" r="6" fill="currentColor" />
                    <path d="M8 35 Q8 25 20 25 Q32 25 32 35" fill="currentColor" />
                  </svg>
                )}
              </div>
                <span className="text-pink-600 font-bold text-sm">KHO VẢI</span>
              </div>
              
              <div className="space-y-2">
              <Link
                href="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Trang chủ</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                  isActive('/about') 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Giới thiệu</span>
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                  isActive('/contact') 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Liên hệ</span>
              </Link>
            </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
