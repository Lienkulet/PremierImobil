'use client';
import ApartmentCard from '@/components/ApartmentCard'
import { useEffect, useState } from 'react';

const Recomandate = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/add'); // Adjust the endpoint based on your API
      const data = await response.json();
      setProperties(data); // Store the latest 5 properties
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  fetchProperties(); // Call the function to fetch properties on component mount
}, []);
return (
  <section>
    <div className="container">
      <h1 className='md:text-3xl text-xl text-white font-semibold mb-10'>Imobile Recomandate</h1>
      <div className='flex flex-wrap md:gap-6 gap-2 justify-center items-center'>
        {properties.map((property, index) => (
          <ApartmentCard property={property} key={index} />
        ))}
      </div>
    </div>
  </section>
)
}

export default Recomandate