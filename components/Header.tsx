import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import Logo from '../public/assets/Bookworms.svg';

const Header = () => {
    return(
        <header className="w-100 bg-green-300 flex flex-row items-center justify-around p-1 shadow-md sticky top-0 z-50">
            <Link href="/">
                <a><Image src={Logo} alt="logo" width="180" height="60"></Image></a>
            </Link>
            <Link href="/library">
                <button className="shadow-sm bg-blue-600 hover:bg-blue-500 transition-colors duration-200 rounded-md px-4 py-2 text-white">
                    Library
                </button>
            </Link>
        </header>
    );
}

export default Header;