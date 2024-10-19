'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Multiselect from 'multiselect-react-dropdown';

const Case = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [type, setType] = useState('Case');

  // Initial filters state
  const [filters, setFilters] = useState({
    type: 'Case',
    propertyCondition: [],
    locativeFont: [],
    region: [],
    sector: [],
    areaMin: '',
    areaMax: '',
    priceMin: '',
    priceMax: ''
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

  // Handle multi-select filter changes
  const handleMultiSelectChange = (filterName, selectedList) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: selectedList.map(item => item.value) // Extract selected values
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);  // Show loading during filtering

      const result = properties.filter(property => {
        return (
          (!filters.locativeFont.length || filters.locativeFont.includes(property.locativeFont)) &&
          (!filters.propertyCondition.length || filters.propertyCondition.includes(property.propertyCondition)) &&
          (!filters.region.length || filters.region.includes(property.region)) &&
          (!filters.sector.length || filters.sector.includes(property.sector)) &&
          (!filters.areaMin || property.supraface >= parseInt(filters.areaMin)) &&
          (!filters.areaMax || property.supraface <= parseInt(filters.areaMax)) &&
          (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
          (!filters.priceMax || property.price <= parseFloat(filters.priceMax))
        );
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

  const locativeFontOptions = [
    { value: 'Construcţii Noi', label: 'Construcţii Noi' },
    { value: 'Secundar', label: 'Secundar' }
  ];

  const propertyConditionOptions = [
    { value: 'Reparație euro', label: 'Reparație euro' },
    { value: 'Fără reparație/Variantă albă', label: 'Fără reparație/Variantă albă' }
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

  // Tailwind CSS for consistent input styling
  const unifiedInputStyle = "bg-[#2D2D2D] border border-[#ccc] border-solid p-1 text-white rounded-md w-full md:w-[190px] min-h-[22px]";

  return (
    <section className="md:p-8">
      {/* Filters Section */}
      <header className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-6">
          <h1 className="text-white text-2xl md:text-4xl font-bold">Proprietăți - Case</h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Single-select Type */}
            <select className={unifiedInputStyle}
              onChange={(e) => {
                handleTypeChange(e.target.value);
              }}>
              <option value="Case">Case</option>
              <option value="Apartamente">Apartamente</option>
              <option value="Comercial">Spații Comerciale</option>
              <option value="Terenuri">Terenuri</option>
            </select>

            {/* Multi-select Locative Font */}
            <Multiselect
              options={locativeFontOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('locativeFont', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('locativeFont', selectedList)}
              placeholder="Fond Locativ"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Multi-select Property Condition */}
            <Multiselect
              options={propertyConditionOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('propertyCondition', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('propertyCondition', selectedList)}
              placeholder="Stare Imobil"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

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

            {/* Surface Area Range */}
            <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
              <input
                type="number"
                placeholder="Min suprafața (m2)"
                className={unifiedInputStyle}
                onChange={(e) => setFilters(prev => ({ ...prev, areaMin: e.target.value }))}
              />
              <span className="text-gray-400 hidden md:block">-</span>
              <input
                type="number"
                placeholder="Max suprafața (m2)"
                className={unifiedInputStyle}
                onChange={(e) => setFilters(prev => ({ ...prev, areaMax: e.target.value }))}
              />
            </div>

            {/* Price Range */}
            <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
              <input
                type="number"
                placeholder="Min preț (€)"
                className={unifiedInputStyle}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
              />
              <span className="text-gray-400 hidden md:block">-</span>
              <input
                type="number"
                placeholder="Max preț (€)"
                className={unifiedInputStyle}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
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
            <p className="text-white">Nicio casă nu se potrivește cu filtrele selectate.</p>
          )
        )}
      </div>
    </section>
  );
};

export default Case;
