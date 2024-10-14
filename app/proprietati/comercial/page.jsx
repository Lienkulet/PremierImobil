'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Comercial = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    type: 'Comercial',       // Type (Comercial, Apartamente, Case, Terenuri)
    destination: '',         // Destination (
    propertyCondition: '',   // Property Condition (like 'Renovat', 'Nerenovat')
    region: '',              // Region (like 'Chişinău', 'Suburbii')
    sector: '',              // Sector (like 'Buiucani', 'Centru')
    priceMin: null,          // Minimum price
    priceMax: null,          // Maximum price
    areaMin: null,           // Minimum surface area
    areaMax: null            // Maximum surface area
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

const unifiedInputStyle = "bg-[#2D2D2D] border border-[#ccc] border-solid p-1 text-white rounded-md  w-full md:w-[190px] min-h-[22px]";

  // Fetch properties from the API based on type
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);  // Start loading when fetching data
      try {
        const response = await fetch(`/api/${filters.type.toLowerCase()}`);
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
  }, [filters.type]);

  // Update filters when user selects new criteria
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);  // Show loading during filtering
      let result = properties.filter(property => {
        return (!filters.region || property.region === filters.region) &&
          (!filters.sector || property.sector === filters.sector) &&
          (!filters.destination || property.destination === filters.destination) &&
          (!filters.propertyCondition || property.propertyCondition === filters.propertyCondition) &&
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
    router.push(`/proprietati/${value.toLowerCase()}`);
  };

  return (
    <section className="md:p-8">
      {/* Filters Section */}
      <header className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-6 ">
          <h1 className="text-white text-2xl md:text-4xl font-bold">Proprietăți - {filters.type}</h1>
          {/* Dropdowns for various attributes */}
          <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
            {/* Property Type Filter */}
            <select className={unifiedInputStyle}
              onChange={(e) => {
                handleFilterChange('type', e.target.value);
                handleTypeChange(e.target.value);
              }}>
              <option value="Comercial">Spații Comerciale</option>
              <option value="Apartamente">Apartamente</option>
              <option value="Case">Case</option>
              <option value="Terenuri">Terenuri</option>
            </select>

            {/* Destination Filter */}
            <select className={unifiedInputStyle}
              onChange={(e) => handleFilterChange('destination', e.target.value)}>
              <option value="">Destinaţie Spatiu</option>
              <option value="Comercial">Comercial</option>
              <option value="Birouri">Birouri</option>
              <option value="Depozit">Depozit/Producere</option>
            </select>

            {/* Property Condition Filter */}
            <select className={unifiedInputStyle}
              onChange={(e) => handleFilterChange('propertyCondition', e.target.value)}>
              <option value="">Stare Imobil</option>
              <option value="euro">Reparație euro</option>
              <option value="mediu">Reparație mediu</option>
              <option value="alb">Fără reparație/Variantă albă</option>
            </select>

            {/* Region Filter */}
            <select className={unifiedInputStyle}
              onChange={(e) => {
                handleFilterChange('region', e.target.value);
                handleFilterChange('sector', ''); // Reset sector when region changes
              }}>
              <option value="">Selectează Regiune</option>
              <option value="Chişinău">Chişinău</option>
              <option value="Suburbii">Suburbii</option>
            </select>

            {/* Sector Filter */}
            <select className={unifiedInputStyle}
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              disabled={!filters.region}>
              <option value="">Selectează Sector</option>
              {filters.region && sectorsByRegion[filters.region]?.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
             {/* Surface Area Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="number"
              placeholder="Min suprafața (m2)"
              className={unifiedInputStyle}
              onChange={(e) => handleFilterChange('areaMin', e.target.value)}
            />
            <span className="text-gray-400 hidden md:block">-</span>
            <input
              type="number"
              placeholder="Max suprafața (m2)"
              className={unifiedInputStyle}
              onChange={(e) => handleFilterChange('areaMax', e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="number"
              placeholder="Min preț (€)"
              className={unifiedInputStyle}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            />
            <span className="text-gray-400 hidden md:block">-</span>
            <input
              type="number"
              placeholder="Max preț (€)"
              className={unifiedInputStyle}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            />
          </div>
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
              <ApartmentCard property={property} key={index} />
            ))
          ) : (
            <p className="text-white">Niciun spațiu nu se potrivește cu filtrele selectate.</p>
          )
        )}
      </div>
    </section>
  );
};

export default Comercial;
