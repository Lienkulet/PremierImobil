'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Multiselect from 'multiselect-react-dropdown';

const Terenuri = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    type: 'Terenuri',   // Type (Terenuri, Apartamente, Case, Comercial)
    region: [],
    sector: [],
    destination: [],
    priceMin: '',
    priceMax: '',
    suprafaceMin: '',
    suprafaceMax: ''
  });

  // Mapping of regions to sectors
  const sectorsByRegion = {
    'Chişinău': ['Buiucani', "Sculeanca", 'Rîşcani', 'Centru', 'Botanica', 'Telecentru', "Poșta Veche", "Aeroport"],
    'Suburbii': [
      'Anenii Noi', 'Truşeni', 'Durleşti', 'Băcioi', 'Bubuieci', 'Ciorescu',
      'Codru', 'Cricova', 'Dumbrava', 'Ialoveni', 'Măgdăceşti', 'Stăuceni',
      'Tohatin', 'Vadul lui Vodă', 'Cojuşna', 'Budeşti', 'Sîngera', 'Cruzesti',
      'Străşeni', 'Orhei', 'Ghidighici', 'Grătieşti', 'Vatra', 'Coloniţa',
      'Cheltuitori', 'Cahul', 'Peresecina'
    ]
  };

  const unifiedInputStyle = "bg-[#2D2D2D] border border-[#ccc] border-solid p-1 text-white rounded-md w-full md:w-[190px] min-h-[22px]";

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

  // Handle multi-select filter changes
  const handleMultiSelectChange = (filterName, selectedList) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: selectedList.map(item => item.value)
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);  // Show loading during filtering
      let result = properties.filter(property => {
        return (!filters.region.length || filters.region.includes(property.region)) &&
          (!filters.sector.length || filters.sector.includes(property.sector)) &&
          (!filters.destination.length || filters.destination.includes(property.destination)) &&
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

  // Multi-select options for filters
  const destinationOptions = [
    { value: 'Agricol', label: 'Agricol' },
    { value: 'Rezidențial', label: 'Rezidențial' },
    { value: 'Industrial', label: 'Industrial' }
  ];

  const regionOptions = [
    { value: 'Chişinău', label: 'Chişinău' },
    { value: 'Suburbii', label: 'Suburbii' }
  ];

  const sectorOptions = filters.region.flatMap(region =>
    sectorsByRegion[region]?.map(sector => ({
      value: sector, label: sector
    })) || []
  );

  return (
    <section className="md:p-8">
      {/* Filters Section */}
      <header className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-6">
          <h1 className="text-white text-2xl md:text-4xl font-bold">Proprietăți - {filters.type}</h1>

          <div className="flex flex-wrap gap-4">
            {/* Property Type Filter */}
            <select className={unifiedInputStyle}
              onChange={(e) => {
                handleTypeChange(e.target.value);
              }}>
              <option value="Terenuri">Terenuri</option>
              <option value="Apartamente">Apartamente</option>
              <option value="Case">Case</option>
              <option value="Comercial">Spații Comerciale</option>
            </select>

            {/* Multi-select Region */}
            <Multiselect
              options={regionOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('region', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('region', selectedList)}
              placeholder="Regiune"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Multi-select Sector */}
            <Multiselect
              options={sectorOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('sector', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('sector', selectedList)}
              placeholder="Sector"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              disabled={!filters.region.length} // Disable if no region selected
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Multi-select Destination */}
            <Multiselect
              options={destinationOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('destination', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('destination', selectedList)}
              placeholder="Destinație"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Surface Area Range */}
            <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
              <input
                type="number"
                placeholder="Min suprafața (m2)"
                className={unifiedInputStyle}
                onChange={(e) => handleFilterChange('suprafaceMin', e.target.value)}
              />
              <span className="text-gray-400 hidden md:block">-</span>
              <input
                type="number"
                placeholder="Max suprafața (m2)"
                className={unifiedInputStyle}
                onChange={(e) => handleFilterChange('suprafaceMax', e.target.value)}
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
            <p className="text-white">Niciun teren nu se potrivește cu filtrele selectate.</p>
          )
        )}
      </div>
    </section>
  );
};

export default Terenuri;
