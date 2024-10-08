'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [type, setType] = useState('Apartamente');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Initial filters state
  const [filters, setFilters] = useState({
    type: 'Apartamente',
    rooms: '',
    status: '',
    heatingType: '',
    region: '',
    sector: '',
    propertyCondition: '',
    areaMin: '',
    areaMax: '',
    priceMin: 0,
    priceMax: ''
  });

  // Mapping of regions to sectors
  const sectorsByRegion = {
    'Chişinău': ['Buiucani', "Sculeanca", 'Centru', 'Botanica', 'Telecentru', "Poșta Veche", "Aeroport"],
    'Suburbii': [
        'Anenii Noi', 'Truşeni', 'Durleşti', 'Băcioi', 'Bubuieci', 'Ciorescu',
        'Codru', 'Cricova', 'Dumbrava', 'Ialoveni', 'Măgdăceşti', 'Stăuceni',
        'Tohatin', 'Vadul lui Vodă', 'Cojuşna', 'Budeşti', 'Sîngera', 'Cruzesti',
        'Străşeni', 'Orhei', 'Ghidighici', 'Grătieşti', 'Vatra', 'Coloniţa',
        'Cheltuitori', 'Cahul', 'Peresecina'
    ]
};

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/apartamente`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [type]);

  // Update filters when user selects new criteria
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value || ''
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);
      let result = properties.filter(property => {
        return  (!filters.rooms || property.rooms.toString() === filters.rooms) &&
          (!filters.status || property.locativeFont === filters.status) &&
          (!filters.heatingType || property.heatingType === filters.heatingType) &&
          (!filters.region || property.region === filters.region) &&
          (!filters.sector || property.sector === filters.sector) &&
          (!filters.propertyCondition || property.propertyCondition === filters.propertyCondition) &&
          (!filters.areaMin || property.supraface >= parseInt(filters.areaMin)) &&
          (!filters.areaMax || property.supraface <= parseInt(filters.areaMax)) &&
          (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
          (!filters.priceMax || property.price <= parseFloat(filters.priceMax));
      });

      setFilteredProperties(result);
      setLoading(false);
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
          <h1 className="text-white text-4xl font-bold">Proprietăți - Apartamente</h1>
          {/* Dropdowns for various attributes */}
          <div className="flex flex-wrap gap-2">
            {/* Property Type Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => {
                handleFilterChange('type', e.target.value);
                handleTypeChange(e.target.value);
              }}>
              <option value="Apartamente">Apartamente</option>
              <option value="Case">Case</option>
              <option value="Comercial">Spații Comerciale</option>
              <option value="Terenuri">Terenuri</option>
            </select>

            {/* Rooms Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('rooms', e.target.value)}>
              <option value="">Nr. camere</option>
              <option value="1 Cameră">1 Cameră</option>
              <option value="1 Cameră+living">1 Cameră+Living</option>
              <option value="2 Camere">2 Camere</option>
              <option value="2 Camere+living">2 Camere+Living</option>
              <option value="3 Camere">3 Camere</option>
              <option value="3 Camere+living">3 Camere+Living</option>
              <option value="4 Camere">4 Camere</option>
              <option value="4 Camere+living">4 Camere+Living</option>
              <option value="5+ Camere+">5+ Camere</option>
            </select>


            {/* Property Status Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="">Fond Locativ</option>
              <option value="Bloc Nou">Bloc Nou</option>
              <option value="Bloc Secundar">Bloc Secundar</option>
            </select>

            {/* Property Condition Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('propertyCondition', e.target.value)}>
              <option value="">Stare Imobil</option>
              <option value="Reparație euro">Reparație euro</option>
              <option value="Reparație mediu">Reparație mediu</option>
              <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
            </select>

            {/* Heating Type Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('heatingType', e.target.value)}>
              <option value="">Tip Încălzire</option>
              <option value="Centralizată">Centralizată</option>
              <option value="Autonomă">Autonomă</option>
            </select>

            {/* Region Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => {
                handleFilterChange('region', e.target.value);
                handleFilterChange('sector', ''); // Reset sector when region changes
              }}>
              <option value="">Regiune</option>
              <option value="Chişinău">Chişinău</option>
              <option value="Suburbii">Suburbii</option>
            </select>

            {/* Sector Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              disabled={!filters.region}>
              <option value="">Selectează Sector</option>
              {filters.region && sectorsByRegion[filters.region]?.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Range Inputs */}
        <div className="flex flex-col gap-4 items-end justify-end">
          {/* Surface Area Range */}
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
              <p className="text-white">Niciun apartament nu se potrivește cu filtrele selectate.</p>
            )
          )
        }
      </div>
    </section>
  );
};

export default Page;
