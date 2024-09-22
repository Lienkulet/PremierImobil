'use client';

import TerenCard from "@/components/TerenuriCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Terenuri = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    type: 'Terenuri',   // Type (Terenuri, Apartamente, Case, Comercial)
    region: '',         // Region (like 'Chişinău', 'Suburbii')
    sector: '',         // Sector (like 'Buiucani', 'Centru')
    destination: '',    // Destination (like 'Agricol', 'Rezidențial')
    priceMin: null,     // Minimum price
    priceMax: null,     // Maximum price
    suprafaceMin: null, // Minimum surface area
    suprafaceMax: null  // Maximum surface area
  });

  // Mapping of regions to sectors
  const sectorsByRegion = {
    'Chişinău': ['Buiucani', 'Centru', 'Botanica', 'Telecentru', 'Ciocana', 'Râșcani'],
    'Suburbii': ['Anenii Noi', 'Truşeni', 'Durlesti', 'Băcioi', 'Bubuieci']
  };

  // Fetch properties from API based on type
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
          (!filters.suprafaceMin || property.supraface >= parseInt(filters.suprafaceMin)) &&
          (!filters.suprafaceMax || property.supraface <= parseInt(filters.suprafaceMax)) &&
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
          <h1 className="text-white text-4xl font-bold">Proprietăți - {filters.type}</h1>
          <div className="flex flex-wrap gap-4">
            {/* Property Type Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => { 
                handleFilterChange('type', e.target.value); 
                handleTypeChange(e.target.value); 
              }}>
              <option value="Terenuri">Terenuri</option>
              <option value="Apartamente">Apartamente</option>
              <option value="Case">Case</option>
              <option value="Comercial">Spații Comerciale</option>
            </select>

            {/* Region Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => { 
                handleFilterChange('region', e.target.value); 
                handleFilterChange('sector', ''); // Reset sector when region changes
              }}>
              <option value="">Selectează Regiune</option>
              <option value="Chişinău">Chişinău</option>
              <option value="Suburbii">Suburbii</option>
            </select>

            {/* Sector Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              disabled={!filters.region}>
              <option value="">Selectează Sector</option>
              {filters.region && sectorsByRegion[filters.region]?.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>

            {/* Destination Filter */}
            <select className="bg-gray-800 text-white p-2 rounded-lg w-fit min-w-[128px] h-[50px]"
              onChange={(e) => handleFilterChange('destination', e.target.value)}>
              <option value="">Destinaţie</option>
              <option value="Agricol">Agricol</option>
              <option value="Rezidențial">Rezidențial</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>
        </div>

        {/* Range Inputs */}
        <div className="flex flex-col gap-4 items-center">
          {/* Surface Area Range */}
          <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
            <input
              type="number"
              placeholder="Min suprafața (m2)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('suprafaceMin', e.target.value)}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max suprafața (m2)"
              className="bg-gray-800 text-white p-2 rounded-lg w-40 h-[50px]"
              onChange={(e) => handleFilterChange('suprafaceMax', e.target.value)}
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
              <TerenCard property={property} key={index} />
            ))
          ) : (
            <p className="text-white">Niciun teren nu se potrivește cu filtrele selectate.</p>
          )
        )}
      </div>
    </section>
  );
};

export default Terenuri;
