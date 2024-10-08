'use client';

import CaseCard from "@/components/CaseCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Case = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    type: 'Case',             // Type (Case, Apartamente, Comercial, Terenuri)
    floors: '',               // Number of floors
    rooms: '',                // Number of rooms
    locativeFont: '',         // Locative Font (Construcţii Noi, Secundar)
    propertyCondition: '',     // Property Condition (Renovat, Nerenovat)
    region: '',               // Region (Chişinău, Suburbii)
    sector: '',               // Sector (Buiucani, Centru, etc.)
    priceMin: '',             // Minimum price
    priceMax: '',             // Maximum price
    areaMin: '',              // Minimum surface area
    areaMax: ''               // Maximum surface area
  });

  // Mapping of regions to sectors
  const sectorsByRegion = {
    'Chişinău': ['Buiucani', "Sculeanca", 'Rîşcani','Centru', 'Botanica', 'Telecentru', "Poșta Veche", "Aeroport"],
    'Suburbii': [
        'Anenii Noi', 'Truşeni', 'Durleşti', 'Băcioi', 'Bubuieci', 'Ciorescu',
        'Codru', 'Cricova', 'Dumbrava', 'Ialoveni', 'Măgdăceşti', 'Stăuceni',
        'Tohatin', 'Vadul lui Vodă', 'Cojuşna', 'Budeşti', 'Sîngera', 'Cruzesti',
        'Străşeni', 'Orhei', 'Ghidighici', 'Grătieşti', 'Vatra', 'Coloniţa',
        'Cheltuitori', 'Cahul', 'Peresecina'
    ]
};

  // Fetch properties from the API based on type
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);  // Start loading when fetching data
      try {
        const response = await fetch(`/api/case`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);  // Stop loading after fetching is complete
      }
    };

    fetchProperties();
  }, []);

  // Update filters when user selects new criteria
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value || '' // Avoid setting `null`
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);  // Show loading during filtering
  
      const result = properties.filter(property => {
        return (
          (!filters.rooms || property.rooms === parseInt(filters.rooms)) &&
          (!filters.floors || property.floors === parseInt(filters.floors)) &&
          (!filters.locativeFont || property.locativeFont?.toLowerCase() === filters.locativeFont.toLowerCase()) && // Case insensitive
          (!filters.propertyCondition || property.propertyCondition?.toLowerCase() === filters.propertyCondition.toLowerCase()) && // Case insensitive
          (!filters.region || property.region.toLowerCase() === filters.region.toLowerCase()) && // Case insensitive
          (!filters.sector || property.sector.toLowerCase() === filters.sector.toLowerCase()) && // Case insensitive
          (!filters.areaMin || property.supraface >= parseInt(filters.areaMin)) &&
          (!filters.areaMax || property.supraface <= parseInt(filters.areaMax)) &&
          (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
          (!filters.priceMax || property.price <= parseFloat(filters.priceMax))
        );
      });
  
      console.log("Filtered properties:", result);  // Log filtered properties for debugging
      setFilteredProperties(result);
      setLoading(false);  // Stop loading after filtering is complete
    };
  
    applyFilters();
  }, [filters, properties]);
  
  // Navigate to the corresponding page when a property type is selected
  const handleTypeChange = (value) => {
    router.push(`/proprietati/${value.toLowerCase()}`);
  };

  return (
    <section className="md:p-8">
      {/* Filters Section */}
      <header className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-6 ">
          <h1 className="text-white text-4xl font-bold">Proprietăți - Case</h1>
          {/* Dropdowns for various attributes */}
          <div className="flex flex-wrap gap-4">
            {/* Property Type Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => {
                handleFilterChange('type', e.target.value);
                handleTypeChange(e.target.value);
              }}>
              <option value="Case">Case</option>
              <option value="Apartamente">Apartamente</option>
              <option value="Comercial">Spații Comerciale</option>
              <option value="Terenuri">Terenuri</option>
            </select>

            {/* Property Condition Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('propertyCondition', e.target.value)}>
              <option value="">Stare Imobil</option>
              <option value="Reparație euro">Reparație euro</option>
              <option value="Reparație mediu">Reparație mediu</option>
              <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
            </select>

            {/* Locative Font Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('locativeFont', e.target.value)}>
              <option value="">Fond Locativ</option>
              <option value="Construcţii Noi">Construcţii Noi</option>
              <option value="Secundar">Secundar</option>
            </select>

            {/* Region Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => {
                handleFilterChange('region', e.target.value);
                handleFilterChange('sector', ''); // Reset sector when region changes
              }}>
              <option value="">Selectează Regiune</option>
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

            {/* Rooms Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('rooms', e.target.value)}>
              <option value="">Nr. camere</option>
              <option value="1">1 Cameră</option>
              <option value="2">2 Camere</option>
              <option value="3">3 Camere</option>
            </select>

            {/* Floors Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('floors', e.target.value)}>
              <option value="">Nr. etaje</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        {/* Range Inputs */}
        <div className="flex flex-col gap-4 items-end justify-end">
          {/* Surface Area Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="number"
              placeholder="Min suprafața (m2)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('areaMin', e.target.value)}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max suprafața (m2)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('areaMax', e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="number"
              placeholder="Min preț (€)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max preț (€)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Properties List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full">
            <ClipLoader color="#BB8D3F" loading={loading} size={150} />
          </div>
        ) : (
          filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <CaseCard property={property} key={index} />
            ))
          ) : (
            <p className="text-white">Nicio casa nu se potrivește cu filtrele selectate.</p>
          )
        )}
      </div>
    </section>
  );
};

export default Case;
