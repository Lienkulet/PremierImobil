'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [type, setType] = useState('');
  const typeDef = useSearchParams().get('type');
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    type: typeDef,
    rooms: null,
    status: null,
    heatingType: null,
    region: null,
    parking: null,
    levels: null,
    bathrooms: null,
    balconies: null,
    propertyCondition: null,  // Stare Imobil filter
    areaMin: null,
    areaMax: null,
    priceMin: 0,
    priceMax: null
  });

  useEffect(() => {
    setLoading(true);
    setType(typeDef);
    setLoading(false);
  }, [])

  useEffect(() => {
    setLoading(true);

    const fetchProperties = async () => {
      try {
        const response = await fetch(`/api/add`);
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

      fetchProperties();
      setLoading(false);

  }, [type]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value ? value : null
    }));
  };

  useEffect(() => {
    setLoading(true);

    const applyFilters = () => {
      let result = properties.filter(property => {
        return (!filters.type || property.type === filters.type) &&
               (!filters.rooms || property.rooms.toString() === filters.rooms) &&
               (!filters.status || property.locativeFont === filters.status) &&
               (!filters.heatingType || property.heatingType === filters.heatingType) &&
               (!filters.region || property.region === filters.region) &&
               (!filters.parking || property.parking === filters.parking) &&
               (!filters.levels || property.floors.toString() === filters.levels) &&
               (!filters.bathrooms || property.baths.toString() === filters.bathrooms) &&
               (!filters.balconies || property.balcony.toString() === filters.balconies) &&
               (!filters.propertyCondition || property.propertyCondition === filters.propertyCondition) &&
               (!filters.areaMin || property.supraface >= parseInt(filters.areaMin)) &&
               (!filters.areaMax || property.supraface <= parseInt(filters.areaMax)) &&
               (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
               (!filters.priceMax || property.price <= parseFloat(filters.priceMax));
      });

      console.log(result)
      setFilteredProperties(result);
    };

    applyFilters();
    setLoading(false);

  }, [filters, properties]);

  return (
    <section className="md:p-8">
      <h1 className="text-white text-4xl font-bold">Proprietăți - {type || 'Loading...'}</h1>

      {/* Filters Section */}
      <div className="mt-8 flex flex-col md:flex-row items-start justify-between w-full gap-4">
        {/* Dropdowns for various attributes */}
        <div className="flex flex-wrap gap-4">
          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => {handleFilterChange('type', e.target.value), setType(e.target.value === ''? typeDef : e.target.value)}}>
            <option value="">Tip Proprietate</option>
            <option value="Apartament">Apartament</option>
            <option value="Case">Case</option>
            <option value="Comercial">Spațiu Comercial</option>
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('rooms', e.target.value)}>
            <option value="">Nr. camere</option>
            <option value="1">1 Cameră</option>
            <option value="2">2 Camere</option>
            <option value="3">3 Camere</option>
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option value="">Fond Locativ</option>
            <option value="Construcţii Noi">Construcţii Noi</option>
            <option value="Secundar">Secundar</option>
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('heatingType', e.target.value)}>
            <option value="">Tip Încălzire</option>
            <option value="Centralizată">Centralizată</option>
            <option value="Autonomă">Autonomă</option>
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('region', e.target.value)}>
            <option value="">Regiune</option>
            <option value="Buiucani">Buiucani</option>
            <option value="Botanica">Botanica</option>
            <option value="Centru">Centru</option>
            <option value="Telecentru">Telecentru</option>
            <option value="Ciocana">Ciocana</option>
            <option value="Râșcani">Râșcani</option>
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('parking', e.target.value)}>
            <option value="">Parcare</option>
            <option value="Subterana">Subterana</option>
            <option value="Curte">Curte</option>
            <option value="Garaj">Garaj</option>
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('levels', e.target.value)}>
            <option value="">Nr. Niveluri</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num.toString()}>{num}</option>
            ))}
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value)}>
            <option value="">Nr. Bai</option>
            {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num.toString()}>{num}</option>
            ))}
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('balconies', e.target.value)}>
            <option value="">Nr. Balcoane</option>
            {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num.toString()}>{num}</option>
            ))}
          </select>

          <select className="bg-gray-800 text-white p-2 rounded-lg w-40"
                  onChange={(e) => handleFilterChange('propertyCondition', e.target.value)}>
            <option value="">Stare Imobil</option>
            <option value="Renovat">Renovat</option>
            <option value="Nerenovat">Nerenovat</option>
          </select>
        </div>

        {/* Range Inputs */}
        <div className="flex flex-col gap-4 items-center">
          {/* Surface Range */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Min suprafața (m2)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40"
              onChange={(e) => handleFilterChange('areaMin', parseInt(e.target.value))}
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="Max suprafața (m2)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40"
              onChange={(e) => handleFilterChange('areaMax', parseInt(e.target.value))}
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Min preț (€)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40"
              onChange={(e) => handleFilterChange('priceMin', parseFloat(e.target.value))}
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="Max preț (€)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40"
              onChange={(e) => handleFilterChange('priceMax', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      {/* Properties List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          loading? <div className="flex justify-center items-center h-screen w-full">
          <ClipLoader color="#BB8D3F" loading={loading} size={150} />
        </div> : (
          filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
                <ApartmentCard property={property} key={index} />
            ))
          ) : (
            <p className="text-white">Nicio proprietate nu se potrivește cu filtrele selectate.</p>
          )
        )
        }
      </div>
    </section>
  );
};

export default Page;
