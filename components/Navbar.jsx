'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [subMenu, setSubMenu] = useState(false);
    const router = useRouter();
    const { data: session } = useSession(); // Get user session info

    const handleMenu = (e) => {
        e.preventDefault();
        setMenu(!menu);
    };

    const handleCloseMenu = () => {
        setMenu(false);
    };

    return (
        <nav className='w-full px-4 md:px-[56px] py-[33px] flex items-center justify-between relative'>
            {/* Logo */}
            <div className='flex flex-row justify-between items-center w-full md:w-auto'>
                <Link href='/' className='text-mainOrange font-bold text-2xl' onClick={handleCloseMenu}>
                    PremierImobil
                </Link>
                <button className="md:hidden" onClick={handleMenu}>
                    <Image src='/navburger.svg' alt='navburger' width={40} height={40} />
                </button>
            </div>

            {/* Desktop Links */}
            <div className='hidden md:flex md:flex-row items-center gap-6'>
                <Link href='/' className='text-white hover:text-mainOrange duration-500 text-xl'>
                    Acasă
                </Link>
                <Link href='/proprietati/apartamente' className='text-white hover:text-mainOrange duration-500 text-xl'>
                    Imobile
                </Link>
                <Link href='/about' className='text-white hover:text-mainOrange duration-500 text-xl'>
                    Despre Noi
                </Link>
                <Link href='/contact' className='text-white hover:text-mainOrange duration-500 text-xl'>
                    Contacte
                </Link>
                <Link href='/blog' className='text-white hover:text-mainOrange duration-500 text-xl'>
                    Blog
                </Link>
                <Link href='/recomandate' className='text-white hover:text-mainOrange duration-500 text-xl'>
                    Imobile Recomandate
                </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex flex-row items-center gap-4">
                {session?.user ? (
                    <div className='relative'>
                        <button type='button' className='flex flex-row text-mainOrange items-center justify-center gap-4' onClick={e => setSubMenu(!subMenu)}>
                            <h4>{session?.user.name}</h4>
                            <Image src="/user1.svg" alt="Sing" width={40} height={40} />
                        </button>
                        <div className={`absolute top-10 z-50 w-fit flex-col bg-lightGrey p-2 transform-gpu transition-all duration-300 ease-in-out 
                ${subMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                            <Link href='/dashboard' className='text-white hover:text-mainOrange duration-500 text-xl'>
                                Dashboard
                            </Link>
                            <button onClick={() => signOut()} className='text-white hover:text-mainOrange duration-500 text-xl'>
                                Sign out
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => signIn()} className='bg-mainOrange text-white text-lg px-6 py-2 rounded-lg'>
                        Sign In
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu */}
            <div className={`md:hidden transform-gpu transition-all duration-500 ease-in-out absolute top-20 w-full z-10 bg-matteBlack flex flex-col gap-4 pl-6 pt-6 pb-6
                ${menu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-8 invisible'}`}>
                <h3 className='text-white text-xl font-medium'>Vânzare</h3>
                <Link href='/proprietati/apartamente' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Apartamente
                </Link>
                <Link href='/proprietati/comercial' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Spații Comerciale
                </Link>
                <Link href='/proprietati/case' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Case
                </Link>
                <Link href='/proprietati/terenuri' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Terenuri
                </Link>
                <h3 className='text-white text-xl font-medium'>Pagini</h3>
                <Link href='/' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Acasă
                </Link>
                <Link href='/proprietati/apartamente' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Imobile
                </Link>
                <Link href='/about' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Despre Noi
                </Link>
                <Link href='/contact' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Contacte
                </Link>
                <Link href='/blog' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Blog
                </Link>
                <Link href='/recomandate' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                    Imobile Recomandate
                </Link>

                {/* Conditionally render Login or Dashboard in mobile view */}
                {session?.user ? (
                    <>
                        <Link href='/dashboard' className='text-white hover:text-mainOrange duration-500 text-xl w-full text-start' onClick={handleCloseMenu}>
                            Dashboard
                        </Link>
                        <button onClick={() => signOut()} className='text-white hover:text-mainOrange duration-500 text-xl text-start'>
                            Sign out
                        </button>
                    </>
                ) : (
                    <Link href='/login' className='text-mainOrange text-xl' onClick={handleCloseMenu}>
                        Login
                    </Link>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
