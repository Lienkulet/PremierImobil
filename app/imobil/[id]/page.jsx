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
    const [formattedPrice, setFormatedPrice] = useState('0');
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const { id } = params;

    const [formattedList, setFormattedList] = useState([]);

    useEffect(() => {
        // Split the string by '-' and remove empty or invalid items
        const items = property?.characteristics
            .split('-')
            .map(item => item.trim()) // Remove leading/trailing spaces
            .filter(item => item.length > 0); // Filter out empty strings

        setFormattedList(items);
    }, [property]);

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
                setFormatedPrice(propertyData.price.toLocaleString('en-US').replace(/,/g, ' ')); // Adds a space as a separator
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

            toast.success('Property deleted successfully');
            router.push('/');
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
                                    {property.rooms && (
                                        <p className='font-normal text-xl text-mainOrange gap-2 mt-4 flex flex-row items-center'>
                                            <Image src='/bed.svg' alt='rooms' width={28} height={24} />
                                            {property.rooms} camere
                                        </p>
                                    )}
                                    {property.baths && (
                                        <p className='font-normal text-xl text-mainOrange gap-2 mt-4 flex flex-row items-center'>
                                            <Image src='/bath.svg' alt='baths' width={28} height={24} />
                                            {property.baths} băi
                                        </p>
                                    )}
                                </>
                            )}
                            {type === 'case' || type === 'apartamente' && property.parking && (
                                <p className='font-normal text-xl text-mainOrange gap-2 mt-4 flex flex-row items-center'>
                                    <Image src='/garage.svg' alt='parking' width={28} height={24} />
                                    Parcare {property.parking}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end items-start md:mt-0 mt-4">
                        {session?.user && (session?.user.type === 'admin' || session?.user._id === property.agentId._id) && (
                            <div className="flex flex-row gap-4">
                                <a
                                    href={property.link.startsWith('http') ? property.link : `https://${property.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-medium text-mainOrange hover:underline duration-1000 ease-linear"
                                >
                                    {property.linkName}
                                </a>
                                <Link href={`/imobil/${id}/edit?type=${type}`} className="text-xl font-medium text-orange-700 hover:underline duration-1000 ease-linear">
                                    Edit
                                </Link>
                                {session?.user.type === 'admin' &&
                                    <button className="text-xl font-medium text-red-700 hover:underline duration-1000 ease-linear"
                                        onClick={e => handleDelete(e)}>
                                        Delete
                                    </button>
                                }
                            </div>
                        )}
                        <h1 className="text-3xl font-medium text-white">{formattedPrice}€</h1>
                        <h1 className="text-2xl font-light text-white">{property.supraface}m2</h1>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row items-start justify-between ">
                    <div className="w-[600px]">
                        <div className="my-12 flex flex-col gap-4">
                            <p className='font-normal text-xl text-mainOrange'>Descriere: </p>
                            <p className="text-base text-white">{property.description}</p>
                            <p className="font-normal text-xl text-mainOrange">Caracteristici:</p>
                            <ul className="list-disc ml-8 space-y-2">
                                {formattedList?.map((item, index) => (
                                    <li key={index} className="text-white">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base text-white">{property.descriptionFooter}</p>
                        </div>
                        <div className=" gap-4 flex flex-col">
                            <p className='font-normal text-xl text-mainOrange'>Detalii Proprietate: </p>
                            <div className="max-w-[1000px] text-white font-medium pr-8 flex flex-col md:flex-row w-full justify-between md:gap-24">
                                <div>
                                    <h4 className="flex flex-row items-center gap-4">Regiune:<span className="font-light">{property.region}, {property.sector}</span> </h4>
                                    {type == 'case' || type == 'apartamente' && (
                                        <>
                                            {property.floor && property.floors && (
                                                <h4 className="flex flex-row items-center gap-4">Etajul <span className="font-light">{property.floor} din {property.floors}</span></h4>
                                            )}
                                            {property.heatingType && (
                                                <h4 className="flex flex-row items-center gap-4">Tip Incalzire: <span className="font-light">{property.heatingType}</span></h4>
                                            )}
                                            {property.propertyCondition && (
                                                <h4 className="flex flex-row items-center gap-4">Stare apartament: <span className="font-light">{property.propertyCondition}</span></h4>
                                            )}
                                            {property.locativeFont && (
                                                <h4 className="flex flex-row items-center gap-4">Fond Locativ: <span className="font-light">{property.locativeFont}</span></h4>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div>
                                    <h4 className="flex flex-row items-center gap-4">Suprafata: <span className="font-light">{property.supraface}m2</span></h4>
                                    {type == 'case' || type == 'apartamente' && (
                                        <>
                                            {property.rooms && (
                                                <h4 className="flex flex-row items-center gap-4">Nr Camere: <span className="font-light">{property.rooms}</span></h4>
                                            )}
                                            {property.baths && (
                                                <h4 className="flex flex-row items-center gap-4">Nr Grup Sanitar: <span className="font-light">{property.baths}</span></h4>
                                            )}
                                            {property.balcony && (
                                                <h4 className="flex flex-row items-center gap-4">Nr Balcon/Lodja: <span className="font-light">{property.balcony}</span></h4>
                                            )}
                                            {property.parking && (
                                                <h4 className="flex flex-row items-center gap-4">Parcare: <span className="font-light">{property.parking}</span></h4>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {property.agentId && (
                        <div className=" flex flex-col gap-4 mt-8 p-4 border border-lightGrey rounded-xl">
                            <div className="flex flex-row items-center gap-8">
                                {property.agentId.photoUrl && (
                                    <Link href={`/agentproprietati/${property.agentId._id}`}>
                                        <img
                                            src={property.agentId.photoUrl}
                                            alt="Agent's Photo"
                                            className="rounded-xl w-[200px] h-[200px]"
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
