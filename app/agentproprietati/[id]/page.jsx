'use client';
import ApartmentCard from '@/components/ApartmentCard';
import CaseCard from '@/components/CaseCard';
import ComercialCard from '@/components/ComercialCard';
import TerenCard from '@/components/TerenuriCard';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';


const PropertiesPage = ({ params }) => {
    const [apartamente, setApartamente] = useState([]);
    const [caseProperties, setCaseProperties] = useState([]);
    const [comercialProperties, setComercialProperties] = useState([]);
    const [terenuri, setTerenuri] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('apartamente'); // Default to 'apartamente'
    const { id } = params;

    // Fetch apartments on page load
    useEffect(() => {
        const fetchApartamente = async () => {
            try {
                const res = await fetch(`/api/apartamente/agent/${id}`);
                if (!res.ok) throw new Error('Failed to fetch apartments');
                const data = await res.json();
                setApartamente(data);
            } catch (error) {
                console.error(error);
                toast.error('Error fetching apartments');
            } finally {
                setLoading(false); // Set loading to false after fetching apartments
            }
        };

        fetchApartamente();

        // Asynchronously fetch other properties in the background
        const fetchOtherProperties = async () => {
            try {
                // Fetch Case
                const resCase = await fetch(`/api/case/agent/${id}`);
                if (resCase.ok) {
                    const dataCase = await resCase.json();
                    setCaseProperties(dataCase);
                }

                // Fetch Comercial
                const resComercial = await fetch(`/api/comercial/agent/${id}`);
                if (resComercial.ok) {
                    const dataComercial = await resComercial.json();
                    setComercialProperties(dataComercial);
                }

                // Fetch Terenuri
                const resTerenuri = await fetch(`/api/terenuri/agent/${id}`);
                if (resTerenuri.ok) {
                    const dataTerenuri = await resTerenuri.json();
                    setTerenuri(dataTerenuri);
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching other properties');
            }
        };

        fetchOtherProperties();
    }, [id]);

    // Determine which properties to display based on the selected filter
    const getCurrentProperties = () => {
        switch (filter) {
            case 'apartamente':
                return apartamente;
            case 'case':
                return caseProperties;
            case 'comercial':
                return comercialProperties;
            case 'terenuri':
                return terenuri;
            default:
                return apartamente;
        }
    };

    const getCurrentCardComponent = (property) => {
        switch (filter) {
            case 'apartamente':
                return <ApartmentCard key={property._id} property={property} />;
            case 'case':
                return <CaseCard key={property._id} property={property} />;
            case 'comercial':
                return <ComercialCard key={property._id} property={property} />;
            case 'terenuri':
                return <TerenCard key={property._id} property={property} />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#BB8D3F" loading={loading} size={150} />
            </div>
        );
    }

    return (
        <section className="flex flex-col items-start pb-10">
            {/* Property Type Filter using buttons */}
            <div className="flex flex-col md:flex-row w-full items-start justify-start my-4 space-x-4">
                <button
                    onClick={() => setFilter('apartamente')}
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${filter === 'apartamente' ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                >
                    Apartamente
                </button>
                <button
                    onClick={() => setFilter('case')}
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${filter === 'case' ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                >
                    Case
                </button>
                <button
                    onClick={() => setFilter('comercial')}
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${filter === 'comercial' ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                >
                    Spatii Comerciale
                </button>
                <button
                    onClick={() => setFilter('terenuri')}
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${filter === 'terenuri' ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                >
                    Terenuri
                </button>
            </div>


            {/* Display Properties Based on Filter */}
            <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
                {getCurrentProperties().length > 0 ? (
                    getCurrentProperties().map((property) => getCurrentCardComponent(property))
                ) : (
                    <p className="text-center col-span-4 text-gray-300 py-5">
                        Nici-o proprietate de tip {filter} disponibil pentru acest agent.
                    </p>
                )}
            </div>
        </section>
    );
};

export default PropertiesPage;
