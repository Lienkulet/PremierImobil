'use client';
import ImobilSlider from "@/components/ImobilSlider";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const Imobil = ({ params }) => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const { id } = params;

    useEffect(() => {
        if (!id || !type) return;

        async function fetchProperty() {
            setLoading(true);

            try {
                let apiEndpoint = '';
                switch (type) {
                    case 'apartamente':
                        apiEndpoint = `/api/apartamente/${id}`;
                        break;
                    case 'case':
                        apiEndpoint = `/api/case/${id}`;
                        break;
                    case 'comercial':
                        apiEndpoint = `/api/comercial/${id}`;
                        break;
                    case 'terenuri':
                        apiEndpoint = `/api/terenuri/${id}`;
                        break;
                    default:
                        toast.error('Invalid property type');
                        return;
                }

                const res = await fetch(apiEndpoint);
                if (!res.ok) {
                    throw new Error('Failed to fetch property data');
                }

                const propertyData = await res.json();
                setProperty(propertyData);
            } catch (error) {
                console.error(error);
                toast.error('An error occurred while fetching the property data');
            } finally {
                setLoading(false);
            }
        }

        fetchProperty();
    }, [id, type]);

    const handleDelete = async (e) => {
        e.preventDefault();
    
        // Confirm the deletion
        const confirmed = window.confirm("Are you sure you want to delete this property?");
        if (!confirmed) return;
    
        try {
            // Define the endpoint for deletion
            let apiEndpoint = '';
            switch (type) {
                case 'apartamente':
                    apiEndpoint = `/api/apartamente/${property._id}`;
                    break;
                case 'case':
                    apiEndpoint = `/api/case/${property._id}`;
                    break;
                case 'comercial':
                    apiEndpoint = `/api/comercial/${property._id}`;
                    break;
                case 'terenuri':
                    apiEndpoint = `/api/terenuri/${property._id}`;
                    break;
                default:
                    toast.error('Invalid property type');
                    return;
            }
    
            const res = await fetch(apiEndpoint, {
                method: 'DELETE',
            });
    
            if (!res.ok) {
                throw new Error('Failed to delete the property');
            }
    
            // On successful deletion
            toast.success('Property deleted successfully');
            router.push('/'); // Redirect user after deletion (adjust path if necessary)
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('An error occurred while deleting the property');
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#BB8D3F" loading={loading} size={150} />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#BB8D3F" loading={loading} size={150} />
            </div>
        );
    }

    const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`;

    return (
        <section>
            <div>
                <ImobilSlider img={property.images} category={property.category} />
            </div>
            <aside className="flex flex-col gap-4 mt-4">
                <header className="flex md:flex-row flex-col md:items-end items-start justify-between">
                    <div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-bold text-mainOrange">{property.name}, {property.tipAnunt}</h1>
                            <h4 className="text-xl font-normal text-textGrey">{property.address}</h4>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            {type === 'case' || type === 'apartamente' && (
                                <>
                                    <p className='font-normal text-xl text-mainOrange gap-2 mt-4 flex flex-row items-center'>
                                        <Image src='/bed.svg' alt='left' width={28} height={24} />
                                        {property.rooms} camere
                                    </p>
                                    <p className='font-normal text-xl text-mainOrange gap-2 mt-4 flex flex-row items-center'>
                                        <Image src='/bath.svg' alt='left' width={28} height={24} />
                                        {property.baths} băi
                                    </p>
                                </>
                            )}
                            {type === 'case' || type === 'apartamente' && (
                                <p className='font-normal text-xl text-mainOrange gap-2 mt-4 flex flex-row items-center'>
                                    <Image src='/garage.svg' alt='left' width={28} height={24} />
                                    Parcare {property.parking}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end items-start md:mt-0 mt-4">
                        {session?.user && (
                            <div className="flex flex-row gap-4">
                                <a
                                    href={property.link.startsWith('http') ? property.link : `https://${property.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-medium text-mainOrange hover:underline duration-1000 ease-linear"
                                >
                                    {property.linkName}
                                </a>
                                <button className="text-xl font-medium text-red-700 hover:underline duration-1000 ease-linear"
                                    onClick={e => handleDelete(e)}
                                >Delete</button>
                            </div>
                        )}
                        <h1 className="text-3xl font-medium text-white">{property.price}€</h1>
                        <h1 className="text-2xl font-light text-white">{property.supraface}m2</h1>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row items-start justify-between ">
                    {/* Left side - Property Description */}
                    <div className="w-[600px]">
                        <div className="my-12 flex flex-col gap-4">
                            <p className='font-normal text-xl text-mainOrange'>Descriere: </p>
                            <p className="text-base text-white">{property.description}</p>
                        </div>
                        <div className=" gap-4 flex flex-col">
                            <p className='font-normal text-xl text-mainOrange'>Detalii Proprietate: </p>
                            <div className="max-w-[1000px] text-white font-medium pr-8 flex flex-col md:flex-row w-full justify-between md:gap-24">
                                <div>
                                    <h4 className="flex flex-row items-center gap-4">Sectorul: <span className="font-light">{property.region}</span> </h4>
                                    {type == 'case' || type == 'apartamente' && (
                                        <>
                                            <h4 className="flex flex-row items-center gap-4">Etajul <span className="font-light">{property.floor} din {property.floors}</span></h4>
                                            <h4 className="flex flex-row items-center gap-4">Tip Incalzire: <span className="font-light">{property.heatingType}</span></h4>
                                            <h4 className="flex flex-row items-center gap-4">Stare apartament: <span className="font-light">{property.propertyCondition}</span></h4>
                                            <h4 className="flex flex-row items-center gap-4">Fond Locativ: <span className="font-light">{property.locativeFont}</span></h4>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <h4 className="flex flex-row items-center gap-4">Suprafata: <span className="font-light">{property.supraface}m2</span></h4>
                                    {type == 'case' || type == 'apartamente' && (
                                        <>
                                            <h4 className="flex flex-row items-center gap-4">Nr Camere: <span className="font-light">{property.rooms}</span></h4>
                                            <h4 className="flex flex-row items-center gap-4">Nr Grup Sanitar: <span className="font-light">{property.baths}</span></h4>
                                            <h4 className="flex flex-row items-center gap-4">Nr Balcon/Lodja: <span className="font-light">{property.balcony}</span></h4>
                                            <h4 className="flex flex-row items-center gap-4">Parcare: <span className="font-light">{property.parking}</span></h4>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right side - Agent details */}
                    {property.agentId && (
                        <div className=" flex flex-col gap-4 mt-8 p-4 border border-lightGrey rounded-xl">
                            <div className="flex flex-row items-center gap-8">
                                {property.agentId.photoUrl && (
                                    <Link href={`/agentproprietati/${property.agentId._id}`}>
                                    <img
                                        src={property.agentId.photoUrl}
                                        alt="Agent's Photo"
                                        className="rounded-3xl w-[170px] h-[300px]"
                                    />
                                    </Link>
                                )}
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-semibold text-textGrey">Specialist Imobiliar</h4>
                                    <h4 className="text-xl mt-4 font-semibold text-white">{property.agentId.name}</h4>
                                    <a href={`tel:${property.agentId.phoneNr}`} className="text-lg text-textGrey mt-2 gap-4">Telefon:
                                        <span className="text-xl text-mainOrange">  {property.agentId.phoneNr}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Google Maps */}
                <div className="w-full my-12 h-[600px]">
                    <iframe
                        src={googleMapUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />
                </div>
            </aside>
        </section>
    );
}

export default Imobil;
