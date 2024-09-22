'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Case = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [type, setType] = useState('Case');
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    type: 'Case',
    floors: null,
    region: null,
    propertyCondition: null,
    locativeFont: null,
    rooms: null,
    areaMin: null,
    areaMax: null,
    priceMin: 0,
    priceMax: null
  });

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);  // Start loading when fetching data
      try {
        const response = await fetch(`/api/add`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);  // Stop loading after fetching is complete
      }
    };

    fetchProperties();
  }, [type]);

  // Update filters when user selects new criteria
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value ? value : null
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true); // Show loading during filtering
      let result = properties.filter(property => {
        return (!filters.type || property.type === filters.type) &&
          (!filters.rooms || property.rooms.toString() === filters.rooms) &&
          (!filters.floors || property.floors.toString() === filters.floors) &&
          (!filters.locativeFont || property.locativeFont === filters.locativeFont) &&
          (!filters.propertyCondition || property.propertyCondition === filters.propertyCondition) &&
          (!filters.region || property.region === filters.region) &&
          (!filters.areaMin || property.supraface >= parseInt(filters.areaMin)) &&
          (!filters.areaMax || property.supraface <= parseInt(filters.areaMax)) &&
          (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
          (!filters.priceMax || property.price <= parseFloat(filters.priceMax));
      });

      setFilteredProperties(result);
      setLoading(false);  // Stop loading after filtering is complete
    };

    applyFilters();
  }, [filters, properties]);

  // Navigate to the corresponding page when a property type is selected
  const handleTypeChange = (value) => {
    setType(value);
    router.push(`/proprietati/${value.toLowerCase()}`);
  };

  return (
    <section className="md:p-8">
    {/* Filters Section */}
    <header className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
      <div className="flex flex-col items-start justify-between gap-6 ">
        <h1 className="text-white text-4xl font-bold">Proprietăți - Case</h1>
        {/* Dropdowns for various attributes */}
        <div className="flex flex-wrap gap-2">
            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => { handleFilterChange('type', e.target.value); handleTypeChange(e.target.value); }}>
              <option value="Case">Case</option>
              <option value="Apartamente">Apartamente</option>
              <option value="Comercial">Spații Comerciale</option>
              <option value="Terenuri">Terenuri</option>
            </select>

            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('rooms', e.target.value)}>
              <option value="">Nr. camere</option>
              <option value="1">1 Cameră</option>
              <option value="2">2 Camere</option>
              <option value="3">3 Camere</option>
            </select>

            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('floors', e.target.value)}>
              <option value="">Nr. etaje</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('locativeFont', e.target.value)}>
              <option value="">Fond Locativ</option>
              <option value="Construcţii Noi">Construcţii Noi</option>
              <option value="Secundar">Secundar</option>
            </select>

            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('region', e.target.value)}>
              <option value="">Regiune</option>
              <option value="Buiucani">Buiucani</option>
              <option value="Botanica">Botanica</option>
              <option value="Centru">Centru</option>
              <option value="Telecentru">Telecentru</option>
              <option value="Ciocana">Ciocana</option>
              <option value="Râșcani">Râșcani</option>
            </select>
          </div>
        </div>

        {/* Range Inputs */}
        <div className="flex flex-col gap-4 items-end justify-end">
          {/* Surface Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="text"
              placeholder="Min suprafața (m2)"
              className="bg-gray-800 text-white px-2 py-1 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('areaMin', parseInt(e.target.value))}
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="Max suprafața (m2)"
              className="bg-gray-800 text-white px-2 py-1 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('areaMax', parseInt(e.target.value))}
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="text"
              placeholder="Min preț (€)"
              className="bg-gray-800 text-white px-2 py-1 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('priceMin', parseFloat(e.target.value))}
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="Max preț (€)"
              className="bg-gray-800 text-white px-2 py-1 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('priceMax', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </header>


      {/* Properties List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          loading ? (
            <div className="flex justify-center items-center h-screen w-full">
              <ClipLoader color="#BB8D3F" loading={loading} size={150} />
            </div>
          ) : (
            filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <ApartmentCard property={property} key={index} />
              ))
            ) : (
              <p className="text-white">Niciun teren nu se potrivește cu filtrele selectate.</p>
            )
          )
        }
      </div>
    </section>
  );
};

export default Case;
