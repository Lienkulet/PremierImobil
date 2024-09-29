import Image from 'next/image'
import Link from 'next/link'

const ComercialCard = ({ property }) => {
    const { _id, name, desc, address, region, sector, destination, price, supraface, images } = property
    return (
        <Link href={`/imobil/${_id}?type=comercial`}
        className='flex flex-col w-[350px] h-[500px] md:w-[400px] bg-matteBlack border-solid border-2 p-4 border-lightGrey rounded-xl'>
            <img src={`${images[0]}`} alt="" className='h-[260px] w-full rounded-xl' />
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
                             {destination}
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
                </div>
            </div>
        </Link>
    )
}

export default ComercialCard