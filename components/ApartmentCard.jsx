import Image from 'next/image'
import Link from 'next/link'

const ApartmentCard = ({ property }) => {
    const { _id, name, desc, address, link, floor, floors, locativeFont, rooms, baths, balcony, parking,
        type, price, supraface, images } = property
    return (
        <div
            className='flex flex-col w-[350px] md:h-[560px] h-[650px] md:w-[400px] bg-matteBlack border-solid border-2 p-4 border-lightGrey rounded-xl'>
            <img src={`${images[0]}`} alt="" className='min-h-[260px] maxh-[260px] w-full rounded-xl' />
            <div className='p-2'>
                <div>
                    <h3 className='text-white text-2xl font-semibold'>{name}</h3>
                    <p className='font-normal text-sm text-textGrey gap-2 mt-4 flex flex-row items-center'>
                        <Image src='/locationicon.svg' alt='left' width={15} height={15} />
                        {address}
                    </p>
                </div>
                <div className='flex md:flex-row flex-col justify-between mt-2 mb-5'>
                    <div>
                        <p className='font-normal text-sm text-white gap-2 mt-4 flex flex-row items-center'>
                            <Image src='/bed.svg' alt='left' width={15} height={15} />
                            {rooms} camere
                        </p>
                        <p className='font-normal text-sm text-white gap-2 mt-4 flex flex-row items-center'>
                            <Image src='/bath.svg' alt='left' width={15} height={15} />
                            {baths} băi
                        </p>
                    </div>
                    <div>
                        <p className='font-normal text-sm text-white gap-2 mt-4 flex flex-row items-center'>
                            <Image src='/garage.svg' alt='left' width={15} height={15} />
                            Parcare {parking}
                        </p>
                        <p className='font-normal text-sm text-white gap-2 mt-4 flex flex-row items-center'>
                            <Image src='/space.svg' alt='left' width={15} height={15} />
                            {supraface}mp
                        </p>
                    </div>
                </div>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-col w-full gap-2 border-solid border-2 p-2 border-lightGrey rounded-xl'>
                        <h5 className='text-mainOrange text-sm font-light'>Vânzare</h5>
                        <h3 className='text-white font-semibold text-2xl'>{price}€</h3>
                    </div>
                    <Link href={`/imobil/${_id}?type=apartamente`}
                        className='bg-mainOrange flex items-center justify-center rounded-xl w-full max-w-[70px]'>
                        <Image src='/leftarrow.svg' alt='left' width={20} height={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ApartmentCard