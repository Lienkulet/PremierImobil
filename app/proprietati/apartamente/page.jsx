'use client';

import ApartmentCard from "@/components/ApartmentCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Multiselect from 'multiselect-react-dropdown';

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [type, setType] = useState('Apartamente');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Initial filters state
  const [filters, setFilters] = useState({
    type: 'Apartamente',
    rooms: [],
    status: [],
    heatingType: [],
    region: [],
    sector: [],
    propertyCondition: [],
    areaMin: '',
    areaMax: '',
    priceMin: 0,
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

  // Handle multi-select and other filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleMultiSelectChange = (filterName, selectedList) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: selectedList.map(item => item.value) // Extract the selected values
    }));
  };

  // Apply filters when filters or properties change
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);
      let result = properties.filter(property => {
        return (!filters.rooms.length || filters.rooms.includes(property.rooms)) &&
          (!filters.status.length || filters.status.includes(property.locativeFont)) &&
          (!filters.heatingType.length || filters.heatingType.includes(property.heatingType)) &&
          (!filters.region.length || filters.region.includes(property.region)) &&
          (!filters.sector.length || filters.sector.includes(property.sector)) &&
          (!filters.propertyCondition.length || filters.propertyCondition.includes(property.propertyCondition)) &&
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

  // Options for the dropdowns
  const roomOptions = [
    { value: '1 Cameră', label: '1 Cameră' },
    { value: '1 Cameră+Living', label: '1 Cameră+Living' },
    { value: '2 Camere', label: '2 Camere' },
    { value: '2 Camere+Living', label: '2 Camere+Living' },
    { value: '3 Camere', label: '3 Camere' },
    { value: '3 Camere+Living', label: '3 Camere+Living' },
    { value: '4 Camere', label: '4 Camere' }
  ];

  const statusOptions = [
    { value: 'Bloc Nou', label: 'Bloc Nou' },
    { value: 'Bloc Secundar', label: 'Bloc Secundar' }
  ];

  const heatingOptions = [
    { value: 'Centralizată', label: 'Centralizată' },
    { value: 'Autonomă', label: 'Autonomă' }
  ];

  const conditionOptions = [
    { value: 'Reparație euro', label: 'Reparație euro' },
    { value: 'Reparație mediu', label: 'Reparație mediu' },
    { value: 'Fără reparație/Variantă albă', label: 'Fără reparație/Variantă albă' }
  ];

  // Region and Sector options
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
  const unifiedInputStyle = "bg-[#2D2D2D] border border-[#ccc] border-solid p-1 text-white rounded-md  w-full md:w-[190px] min-h-[22px]";

  return (
    <section className="md:p-8">
      {/* Filters Section */}
      <header className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-6 w-full">
          <h1 className="text-white text-2xl md:text-4xl font-bold">Proprietăți - Apartamente</h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
            {/* Single-select Type */}
            <select className={unifiedInputStyle}
              onChange={(e) => {
                handleTypeChange(e.target.value);
              }}>
              <option value="Apartamente">Apartamente</option>
              <option value="Case">Case</option>
              <option value="Comercial">Spații Comerciale</option>
              <option value="Terenuri">Terenuri</option>
            </select>

            {/* Multi-select Rooms */}
            <Multiselect
              options={roomOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('rooms', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('rooms', selectedList)}
              placeholder="Nr. Camere"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Multi-select Status */}
            <Multiselect
              options={statusOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('status', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('status', selectedList)}
              placeholder="Fond Locativ"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Multi-select Heating Type */}
            <Multiselect
              options={heatingOptions}
              displayValue="label"
              onSelect={(selectedList) => handleMultiSelectChange('heatingType', selectedList)}
              onRemove={(selectedList) => handleMultiSelectChange('heatingType', selectedList)}
              placeholder="Tipul de încălzire"
              showCheckbox={true}
              hidePlaceholderAfterSelect={true}
              style={{
                chips: { display: 'none' },
                searchBox: { background: '#2D2D2D', color: '#fff' }
              }}
            />

            {/* Multi-select Property Condition */}
            <Multiselect
              options={conditionOptions}
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

            {/* Multi-select Sector (depends on Region) */}
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
                type="text"
                placeholder="Min suprafața (m2)"
                className={unifiedInputStyle}
                onChange={(e) => handleFilterChange('areaMin', parseInt(e.target.value))}
              />
              <span className="text-gray-400 hidden md:block">-</span>
              <input
                type="text"
                placeholder="Max suprafața (m2)"
                className={unifiedInputStyle}
                onChange={(e) => handleFilterChange('areaMax', parseInt(e.target.value))}
              />
            </div>

            {/* Price Range */}
            <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center gap-2">
              <input
                type="text"
                placeholder="Min preț (€)"
                className={unifiedInputStyle}
                onChange={(e) => handleFilterChange('priceMin', parseFloat(e.target.value))}
              />
              <span className="text-gray-400 hidden md:block">-</span>
              <input
                type="text"
                placeholder="Max preț (€)"
                className={unifiedInputStyle}
                onChange={(e) => handleFilterChange('priceMax', parseFloat(e.target.value))}
              />
            </div>

          </div>
        </div>
      </header>

      {/* Properties List */}
      {
        loading ? (
          <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-transparent z-50">
            <ClipLoader color="#BB8D3F" loading={true} size={150} />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <ApartmentCard property={property} key={index} />
                ))
              ) : (
                <p className="text-white">Niciun apartament nu se potrivește cu filtrele selectate.</p>
              )
            }
          </div>
        )
      }
    </section>
  );
};

export default Page;
