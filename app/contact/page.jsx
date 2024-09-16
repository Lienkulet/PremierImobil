'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Contact = () => {
  const [radio, setRadio] = useState('apartamente');
  const [phone, setPhone] = useState('+373 69 946 741'); // Add state for the phone input

  let handleRadio = (name) => {
    if(name === 'casa') setRadio('casa');
    else if(name === 'apartamente') setRadio('apartamente');
    else if(name === 'teren') setRadio('teren');
    else if(name === 'comercial') setRadio('comercial');
  }

  return (
    <section className='bg-lightGrey relative md:px-[150px] pb-20 flex flex-col items-center'>
      <div className='flex relative'>
        <img src='/contactheader.png' className='w-full rounded-xl md:flex hidden bg-no-repeat bg-cover' />
        <img src='/mobilehero.png' className='w-full h-96 mb-8 md:hidden flex bg-no-repeat bg-cover' />
        <div className='hidden md:flex absolute -bottom-14 right-10'>
          <Image src='/DotsVertical.png'  alt='dots' width={80} height={100} />
        </div>
      </div>
      <div className='hidden md:flex absolute left-0 top-[570px]'>
        <Image src='/DotsElement.png' alt='dots'  width={100} height={100} />
      </div>
      <div className='bg-[#3D3D3D] flex flex-col md:flex-row items-start p-4 max-w-[1000px] w-full md:mt-[200px] rounded-xl'>
        <div className='bg-darkBlue px-10 py-14 rounded-xl w-full max-w-[490px] relative'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-mainOrange md:text-3xl text-xl font-semibold'>Informații de Contact</h2>
            <h4 className='text-[#C9C9C9] text-lg font-normal'>Contactele noastre</h4>
          </div>
          <div className="flex flex-col gap-6 md:gap-14 mt-10 md:mt-24 md:mb-[150px]">
            <p className="flex flex-row items-center text-white gap-2 text-sm md:text-base  font-normal">
              <Image src='/phoneicon.svg' alt='phone' width={20} height={20} />
              +373 78 99 20 14</p>
            <p className="flex flex-row items-center text-white gap-2 text-sm md:text-base font-normal">
              <Image src='/emailicon.svg' alt='email' width={20} height={20} />
              informationoffice365@gmail.com</p>
            <p className="flex flex-row items-center text-white gap-2 text-sm md:text-base font-normal">
              <Image src='/locationicon.svg' alt="location icon" width={20} height={20} />
              Chișinău, Centru, bd. Iuri Gagarin 10</p>
          </div>
          <div className='hidden md:flex flex-row gap-4'>
            <Link href='/'>
              <Image src='/facebook.svg' alt="Facebook" width={30} height={30} />
            </Link>
            <Link href='/'>
              <Image src='/twitter.svg' alt="Twitter" width={30} height={30} />
            </Link>
            <Link href='/'>
              <Image src='/Instagram.svg' alt="Instagram" width={30} height={30} />
            </Link>
          </div>
          <div className='hidden md:flex absolute bottom-0 right-0'>
            <Image src='/eclipseform.svg' alt='eclipse' width={200} height={200} />
          </div>
        </div>
          <form className='flex flex-col w-full md:p-12 p-2'>
            <label className='flex md:flex-row flex-col justify-between gap-2 md:gap-10 w-full'>
              <label className='flex flex-col gap-2'>
                <h4 className='font-medium text-sm text-textGrey'>Numele</h4>
                <input type="text" placeholder='Ion' className='pb-2 bg-transparent focus:border-b-1 focus:border-white outline-none
                 text-white placeholder:text-textGrey border-b-[1px] border-solid borger-textGray md:w-[200px] w-full' />
              </label>
              <label className='flex flex-col gap-2'>
                <h4 className='font-medium text-sm text-textGrey'>Prenumele</h4>
                <input type="text" placeholder='Doe' className='pb-2 bg-transparent focus:border-b-1 focus:border-white outline-none
                 text-white placeholder:text-textGrey border-b-[1px] border-solid borger-textGray md:w-[200px] w-full' />
              </label>
            </label>
            <label className='flex md:flex-row md:mt-10 mt-2 flex-col justify-between gap-2 md:gap-10 w-full'>
              <label className='flex flex-col gap-2'>
                <h4 className='font-medium text-sm text-textGrey'>Email</h4>
                <input type="email" placeholder='example@gmail.com' className='pb-2 bg-transparent focus:border-b-1 focus:border-white outline-none text-white 
                placeholder:text-textGrey border-b-[1px] border-solid borger-textGray md:w-[200px] w-full' />
              </label>
              <label className='flex flex-col gap-2'>
                <h4 className='font-medium text-sm text-textGrey'>Telefon</h4>
                {/* Add onChange handler for phone input */}
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='pb-2 bg-transparent focus:border-b-1 focus:border-white 
                outline-none text-white placeholder:text-textGrey border-b-[1px] border-solid borger-textGray md:w-[200px] w-full' />
              </label>
            </label>
            <label className='md:my-10 my-4'>
              <h3 className='text-sm text-mainOrange font-semibold'>Selectați Opțiunea</h3>
              <div className='flex flex-wrap gap-8 mt-4'>
                <div className='flex flow-row items-center'>
                  <input type='radio' id='apartamente' name="apartamente" value='apartamente' checked={radio==='apartamente'? true : false}
                  className='accent-mainOrange' onChange={() => handleRadio('apartamente')} />
                  <label htmlFor="apartamente" className='ml-2 text-white font-medium text-xs'>Apartamente</label>
                </div>
                <div className='flex flow-row items-center'>
                  <input type='radio' id='casa' name="casa" value='casa' checked={radio==='casa'? true : false}
                  className='accent-mainOrange' onChange={() => handleRadio('casa')} />
                  <label htmlFor="casa" className='ml-2 text-white font-medium text-xs'>Casă</label>
                </div>
                <div className='flex flow-row items-center'>
                  <input type='radio' id='teren' name="teren" value='teren'  checked={radio==='teren'? true : false}
                   className='accent-mainOrange' onChange={() => handleRadio('teren')} />
                  <label htmlFor="teren" className='ml-2 text-white font-medium text-xs'>Teren</label>
                </div>
                <div className='flex flow-row items-center'>
                  <input type='radio' id='comercial' name="comercial" value='comercial' checked={radio==='comercial'? true : false}
                   className='accent-mainOrange' onChange={() => handleRadio('comercial')} />
                  <label htmlFor="comercial" className='ml-2 text-white font-medium text-xs'>Spațiu Comercial</label>
                </div>
              </div>
            </label>
            <label className='flex flex-col gap-2'>
              <h4 className='font-medium text-sm text-textGrey'>Mesaj</h4>
              <input type="text" placeholder='Scrie un mesaj' className='pb-2 bg-transparent focus:border-b-1 focus:border-white outline-none text-white placeholder:text-textGrey border-b-[1px] border-solid borger-textGray w-full' />
            </label>
            <button className='bg-mainOrange w-full md:w-[200px] py-5 px-10 self-end text-white font-medium rounded-lg mt-10'>Trimite Cerere</button>
          </form>
      </div>
    </section>

  )
}

export default Contact;
