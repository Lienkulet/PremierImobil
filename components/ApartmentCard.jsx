import Image from 'next/image';
import Link from 'next/link';

const ApartmentCard = ({ property }) => {
  const {
    _id,
    name,
    address,
    rooms,
    baths,
    parking,
    price,
    supraface,
    images,
    category,
    tipAnunt
  } = property;

  const formattedPrice =  price.toLocaleString('en-US').replace(/,/g, ' '); // Adds a space as a separator

  return (
    <Link href={`/imobil/${_id}?type=apartamente`} 
          className='flex flex-col w-[300px] md:w-[300px] h-[600px] md:h-[650px] bg-matteBlack border-solid border-2 p-4 border-lightGrey rounded-xl duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white transition-transform'>
      
      {/* Image container with relative positioning */}
      <div className="relative">
        <img src={`${images[0]}`} alt='' className='min-h-[200px] md:min-h-[260px] max-h-[200px] md:max-h-[260px] w-full rounded-xl object-cover' />
        
        {/* Category label positioned at the top-right corner */}
        <div className="absolute top-2 right-2 text-mainOrange px-3 py-1 rounded-lg font-semibold text-xs md:text-sm">
          {category}
        </div>
      </div>

      <div className='p-2 flex h-full flex-col justify-between'>
        <div>
          <h3 className='text-white text-lg md:text-2xl font-semibold'>{name}</h3>
          <p className='font-normal text-xs md:text-sm text-textGrey gap-2 mt-2 md:mt-4 flex flex-row items-center'>
            <Image src='/locationicon.svg' alt='location' width={15} height={15} />
            {address}
          </p>
        </div>
        <div className='flex flex-col md:flex-row justify-between mt-2 mb-5'>
          <div>
            <p className='font-normal text-xs md:text-sm text-white gap-2 mt-2 md:mt-4 flex flex-row items-center'>
              <Image src='/bed.svg' alt='bed' width={15} height={15} />
              {rooms}
            </p>
            <p className='font-normal text-xs md:text-sm text-white gap-2 mt-2 md:mt-4 flex flex-row items-center'>
              <Image src='/bath.svg' alt='bath' width={15} height={15} />
              {baths} băi
            </p>
          </div>
          <div>
            <p className='font-normal text-xs md:text-sm text-white gap-2 mt-2 md:mt-4 flex flex-row items-center'>
              <Image src='/garage.svg' alt='garage' width={15} height={15} />
              Parcare {parking}
            </p>
            <p className='font-normal text-xs md:text-sm text-white gap-2 mt-2 md:mt-4 flex flex-row items-center'>
              <Image src='/space.svg' alt='space' width={15} height={15} />
              {supraface} mp
            </p>
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-col w-full gap-2 border-solid border-2 p-2 border-lightGrey rounded-xl'>
            <h5 className='text-mainOrange text-xs md:text-sm font-light'>{tipAnunt}</h5>
            <h3 className='text-white font-semibold text-lg md:text-2xl'>{formattedPrice}€</h3>
          </div>
         
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
