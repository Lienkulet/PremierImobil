'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

    const handleMenu = (e) => {
        e.preventDefault();
        setMenu(!menu);
    };

    // Check if the user is logged in (using token in localStorage)
    useEffect(() => {
        const token = localStorage.getItem('token'); // Check for the token
        if (token) {
            setIsLoggedIn(true); // User is logged in
        } else {
            setIsLoggedIn(false); // User is not logged in
        }
    }, []);

    return (
        <nav className='w-full md:px-[56px] py-[33px] flex flex-row md:items-center md:justify-between justify-between relative'>
            <div className='flex flex-row justify-between gap-[60px] pl-6'>
                <Link href='/' className='text-mainOrange font-bold text-2xl w-fit'>
                    PremierImobil
                </Link>
                <Link href='/' className='text-white hover:text-mainOrange duration-1000 hidden md:flex font-normal text-xl w-fit'>
                    Acasă
                </Link>
                <Link href='/imobile?type=Apartament' className='text-white hover:text-mainOrange duration-1000 hidden md:flex  font-normal text-xl w-fit'>
                    Imobile
                </Link>
                <Link href='/about' className='text-white hover:text-mainOrange duration-1000 hidden md:flex  font-normal text-xl w-fit'>
                    Despre Noi
                </Link>
                <Link href='/contact' className='text-white hover:text-mainOrange duration-1000 hidden md:flex  font-normal text-xl w-fit'>
                    Contacte
                </Link>
                <Link href='/blog' className='text-white hover:text-mainOrange duration-1000 hidden md:flex  font-normal text-xl w-fit'>
                    Blog
                </Link>
                <Link href='/recomandate' className='text-white hover:text-mainOrange duration-1000 hidden md:flex font-normal text-xl w-fit'>
                    Imobile Recomandate
                </Link>
            </div>
            <div className='pr-6'>
                {/* Conditional rendering based on login state */}
                {isLoggedIn ? (
                    <Link href={'/dashboard'} className='hidden md:flex flex-row items-center gap-2 justify-center bg-mainOrange text-white text-lg font-normal px-[24px] py-[15px] rounded-lg'>
                        Dashboard
                    </Link>
                ) : (
                    <Link href={'/login'} className='hidden md:flex flex-row items-center gap-2 justify-center bg-mainOrange text-white text-lg font-normal px-[24px] py-[15px] rounded-lg'>
                        <Image
                            src='/singIn.svg'
                            alt='SingIn Img'
                            width={16}
                            height={16}
                        />
                        Sign In
                    </Link>
                )}
                <button>
                    <Image src='/navburger.svg' alt='navburger' width={40} height={40} onClick={handleMenu} className='flex md:hidden' />
                </button>
            </div>
            <div className={`md:hidden ${menu ? 'flex' : 'hidden'} duration-1000 ease-in-out flex-col gap-4 pl-6 pt-6 pb-6 absolute top-20 w-full z-10 bg-matteBlack`}>
                <h3 className='text-white text-xl font-medium'>Vânzare</h3>
                <Link href='/imobile?type=Apartament' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Apartamente
                </Link>
                <Link href='/imobile?type=Comercial' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Spații Comerciale
                </Link>
                <Link href='/imobile?type=Case' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Case
                </Link>
                <Link href='/imobile?type=Terenuri' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Terenuri
                </Link>
                <h3 className='text-white text-xl font-medium'>Pagini</h3>
                <Link href='/' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Acasă
                </Link>
                <Link href='/imobile?type=Apartament' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Imobile
                </Link>
                <Link href='/about' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Despre Noi
                </Link>
                <Link href='/contact' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Contacte
                </Link>
                <Link href='/blog' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Blog
                </Link>
                <Link href='/recomandate' className='text-mainOrange duration-1000 font-normal text-xl w-fit'>
                    Imobile Recomandate
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
