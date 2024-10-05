'use client';
import Image from "next/image"
import Link from "next/link"
import { signIn, useSession } from 'next-auth/react';

const Footer = () => {
    const { data: session } = useSession(); // Get user session info

    return (
        <footer className="w-full pt-[85px] pb-[55px] bg-darkBlue">
            <div className="container">
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-white text-lg font-semibold mb-[33px]">PremierImobil</h3>
                        <div>
                            <p className="flex flex-row items-center gap-4 text-white text-base font-normal mb-[18px]">
                                <Image src='/locationicon.svg' alt="location icon" width={8} height={10} />
                                Oficiul
                            </p>
                            <a href='https://maps.app.goo.gl/95TtKK7tWFVfDVE88' target="_blank" className="text-textGrey ml-6 mb-[25px]">
                                Chișinău, Centru, bd. Iuri Gagarin 10</a>
                        </div>
                        <Link href="tel:+37378992014" className="flex flex-row items-center mb-[25px] text-textGrey gap-2 text-base font-normal">
                            <Image src='/phoneicon.svg'  alt='phone' width={12} height={12} />
                            +373 78 99 20 14</Link>
                        <Link href="mailto:informationoffice365@gmail.com" className="flex flex-row items-center text-textGrey gap-2 text-base font-normal">
                            <Image src='/emailicon.svg'  alt='email' width={15} height={10} />
                            informationoffice365@gmail.com</Link>
                    </div>
                    <div className="flex-col md:flex hidden">
                        <h3 className="text-white text-lg font-semibold mb-[33px]">Legături Rapide</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href={'/about'} className="text-base font-normal text-textGrey">Despre noi</Link>
                            <h5 className="text-base font-normal text-textGrey">Termeni și condiții</h5>
                            <h5 className="text-base font-normal text-textGrey">Ghid</h5>
                            <h5 className="text-base font-normal text-textGrey">Centru de suport</h5>
                            <Link href={'/blog'} className="text-base font-normal text-textGrey">Blog</Link>
                            <Link href={'/contact'} className="text-base font-normal text-textGrey">Contact</Link>
                            <h5 className="text-base font-normal text-textGrey">Politica de confidențialitate</h5>
                        </nav>
                    </div>
                    <div className="flex-col md:flex hidden">
                        <h3 className="text-white text-lg font-semibold mb-[33px]">Descoperă</h3>
                        <nav className="flex flex-col gap-1">
                            <Link href='/proprietati/apartamente'  className="text-base font-normal text-textGrey">Buiucani</Link>
                            <Link href='/proprietati/apartamente' className="text-base font-normal text-textGrey">Ciocana</Link>
                            <Link href='/proprietati/apartamente' className="text-base font-normal text-textGrey">Botanica</Link>
                            <Link href='/proprietati/apartamente' className="text-base font-normal text-textGrey">Centru</Link>
                            <Link href='/proprietati/apartamente' className="text-base font-normal text-textGrey">Râșcani</Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="md:flex hidden flex-col">
                            <h3 className="text-white text-2xl font-semibold mb-[33px] w-full">Obțineți cele mai recente informații <br /> despre proprietăți de la PremierImobil</h3>
                            <div className="flex pl-[22px] flex-row items-center justify-between gap-[60px] p-1 border-solid border-2 border-textGrey rounded-lg">
                                <p className="text-sm font-normal text-textGrey">Introduceți numărul dvs de telefon</p>
                                <button className="text-sm font-medium text-white p-[20px] bg-mainOrange rounded-lg">
                                    Abonați-vă
                                </button>
                            </div>
                        </div>
                        {!session?.user && (
                            <button onClick={() => signIn()} className='bg-mainOrange text-white text-lg px-6 py-2 rounded-lg w-fit self-end'>
                            Sign In
                        </button>
                        )}
                    </div>
                </div>
                <div className="line mt-[60px] mb-[36px]"></div>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-center gap-4">
                        <h3 className="text-white font-normal text-base">Urmărește-ne</h3>
                        <Link href='/'>
                            <Image src='/facebook.svg' alt="Facebook" width={20} height={20} />
                        </Link>
                        <Link href='/'>
                            <Image src='/youtube.svg' alt="Youtube" width={20} height={20} />
                        </Link>
                        <Link href='/'>
                            <Image src='/Linkedin.svg' alt="Linkedin" width={20} height={20} />
                        </Link>
                        <Link href='/'>
                            <Image src='/twitter.svg' alt="Twitter" width={20} height={20} />
                        </Link>
                        <Link href='/'>
                            <Image src='/Instagram.svg' alt="Instagram" width={20} height={20} />
                        </Link>
                    </div>
                    <h3 className="text-textGrey font-normal text-base md:flex hidden">Politica de confidențialitate | Termeni și condiții | Politica de cookie-uri</h3>
                </div>
            </div>
        </footer>
    )
}

export default Footer