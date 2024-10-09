import Image from 'next/image';
import Link from 'next/link';

const ApartmentCard = ({ property }) => {
  const {
    _id,
    name,
    address,
    price,
    images,
    category,
    tipAnunt
  } = property;

  const formattedPrice = price.toLocaleString('en-US').replace(/,/g, ' '); // Adds a space as a separator

  return (
    <Link href={`/imobil/${_id}?type=apartamente`} 
          className='flex flex-row md:flex-col w-full md:w-[400px] h-[150px] md:h-[400px] bg-matteBlack border-2 border-lightGrey rounded-xl p-3 duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white transition-transform'>
      
      {/* Image container */}
      <div className="relative w-[40%] md:w-full h-full md:h-[250px]">
        <img src={`${images[0]}`} alt='' className='w-full h-full md:h-[250px] rounded-lg object-cover' />
        
        {/* Category label positioned at the top-left corner */}
        <div className="absolute top-2 left-2 bg-mainOrange text-white px-2 py-1 rounded-md text-xs font-medium">
          {category}
        </div>
      </div>

      {/* Card Details */}
      <div className='ml-3 md:ml-0 flex flex-col justify-between w-[60%] md:w-full mt-0 md:mt-3'>
        <div>
          <h3 className='text-white text-sm md:text-lg font-semibold truncate'>{name}</h3>
          <p className='text-textGrey text-xs md:text-sm mt-1 truncate'>{address}</p>
        </div>
        <div className='mt-3 md:mt-4 flex justify-between items-center'>
          <h5 className='text-mainOrange text-xs md:text-sm font-medium'>{tipAnunt}</h5>
          <h3 className='text-white text-base md:text-xl font-bold'>{formattedPrice} €</h3>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
