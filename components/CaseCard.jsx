import Image from 'next/image'
import Link from 'next/link'

const CaseCard = ({ property }) => {
    const { _id, name, desc, address, link, floor, floors, locativeFont, rooms, baths, balcony, parking,
        type, price, supraface, images } = property;
        
        const formattedPrice =  price.toLocaleString('en-US').replace(/,/g, ' '); // Adds a space as a separator

    return (
        <Link href={`/imobil/${_id}?type=case`}
        className='flex flex-col w-[300px] md:w-[300px] h-[600px] md:h-[650px] bg-matteBlack border-solid border-2 p-4 border-lightGrey rounded-xl duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white transition-transform'>
        <img src={`${images[0]}`} alt="" className='h-[260px] w-full rounded-xl' />
            <div className='p-2'>
                <div>
                    <h3 className='text-white text-xl font-semibold'>{name}</h3>
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
                        <h3 className='text-white font-semibold text-2xl'>{formattedPrice}€</h3>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CaseCard