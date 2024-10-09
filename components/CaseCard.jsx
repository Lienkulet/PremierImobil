import Image from 'next/image';
import Link from 'next/link';

const CaseCard = ({ property }) => {
  const {
    _id, name, address, price, images
  } = property;
  
  const formattedPrice = price.toLocaleString('en-US').replace(/,/g, ' '); // Adds a space as a separator

  return (
    <Link href={`/imobil/${_id}?type=case`}
      className='flex flex-row md:flex-col w-[320px] md:w-[350px] h-[150px] md:h-[400px] bg-matteBlack border-solid border-2 p-3 border-lightGrey rounded-xl duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white transition-transform'>
      
      {/* Image Container */}
      <div className="relative w-[40%] md:w-full h-full md:h-[200px]">
        <img src={`${images[0]}`} alt="" className='w-full h-full rounded-xl object-cover' />
      </div>

      {/* Text Container */}
      <div className='ml-3 md:ml-0 p-2 flex flex-col justify-between w-[60%] md:w-full'>
        <div>
          <h3 className='text-white text-sm md:text-lg font-semibold truncate'>{name}</h3>
          <p className='font-normal text-xs md:text-sm text-textGrey gap-2 mt-1 md:mt-2 flex flex-row items-center truncate'>
            <Image src='/locationicon.svg' alt='location' width={15} height={15} />
            {address}
          </p>
        </div>

        {/* Price Section */}
        <div className='flex flex-row gap-4 mt-3 md:mt-4'>
          <div className='flex flex-col w-full gap-2 border-solid border-2 p-2 border-lightGrey rounded-xl'>
            <h5 className='text-mainOrange text-xs md:text-sm font-light'>Vânzare</h5>
            <h3 className='text-white font-semibold text-base md:text-lg'>{formattedPrice} €</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CaseCard;
