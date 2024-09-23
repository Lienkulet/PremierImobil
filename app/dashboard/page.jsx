"use client";
import { useState } from 'react';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    const router = useRouter();
    const { data: session, status } = useSession();
    const [formDisplay, setFormDisplay] = useState(1); // Default formDisplay set to 1
    // State variables for property creation
    const [name, setName] = useState('');
    const [propertyCondition, setPropertyCondition] = useState('');
    const [description, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]); // Store multiple photos
    const [link, setLink] = useState('');
    const [floor, setFloor] = useState(0);
    const [floors, setFloors] = useState(0);
    const [locativeFont, setLocativeFont] = useState('Bloc Nou');
    const [rooms, setRooms] = useState(0);
    const [baths, setBaths] = useState(0);
    const [balcony, setBalcony] = useState(0);
    const [parking, setParking] = useState('Subterana');
    const [type, setType] = useState('Apartament');
    const [price, setPrice] = useState(0);
    const [supraface, setSupraface] = useState(0);
    const [heatingType, setheatingType] = useState("");

    // State variables for agent creation
    const [agentName, setAgentName] = useState('');
    const [agentEmail, setAgentEmail] = useState('');
    const [agentPass, setAgentPass] = useState('');
    const [agentPhoto, setAgentPhoto] = useState(null); // Store agent's photo

    // State for regions
    const [region, setRegion] = useState('Chişinău');
    const [sector, setSector] = useState('');
    // Available sectors based on the selected region
    const sectorsByRegion = {
        'Chişinău': ['Buiucani', 'Centru', 'Botanica', 'Telecentru'],
        'Suburbii': ['Anenii Noi', 'Truşeni', 'Durlesti', 'Băcioi', 'Bubuieci'],
    };
    if (status === 'unauthenticated') {
        return <h1 className="h-screen flex items-center justify-center text-white text-5xl">Acces Interzis</h1>
    }

    // Function to upload agent photo to Cloudinary
    const uploadAgentPhoto = async () => {
        if (!agentPhoto) return '';

        const formData = new FormData();
        formData.append("file", agentPhoto);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${UPLOAD_PRESET}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            return data.secure_url; // Return the uploaded image URL
        } catch (error) {
            console.error("Error uploading agent photo:", error);
            return '';
        }
    };

    // Function to handle form submission for agent creation
    const handleAgentSubmit = async (e) => {
        e.preventDefault();

        if (!agentName || !agentEmail || !agentPass) {
            toast.error("All fields are required");
            return;
        }

        // Upload the agent's photo and get the URL
        const uploadedPhotoUrl = await uploadAgentPhoto();

        try {
            const res = await fetch(`/api/agent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: agentName,
                    email: agentEmail,
                    password: agentPass,
                    photoUrl: uploadedPhotoUrl, 
                }),
            });

            if (!res.ok) {
                throw new Error("Error occurred while creating agent");
            }


            toast.success('Agent creat cu success');
            setAgentName('');
            setAgentEmail('');
            setAgentPass('');
            setAgentPhoto(null); // Clear the photo input
        } catch (error) {
            console.log(error);
        }
    };

    // Function to upload multiple property images to Cloudinary
    const uploadPropertyImages = async () => {
        if (photos.length === 0) return [];

        const imageUrls = [];

        for (let i = 0; i < photos.length; i++) {
            const formData = new FormData();
            formData.append("file", photos[i]);
            formData.append("upload_preset", UPLOAD_PRESET);

            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?upload_preset=${UPLOAD_PRESET}`, {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                imageUrls.push(data.secure_url); // Add the uploaded image URL to array
            } catch (error) {
                console.log(error);
            }
        }

        return imageUrls; // Return the array of uploaded image URLs
    };

    // Function to handle form submission for property creation
    const handlePropertySubmit = async (e, val) => {
        e.preventDefault();
        if (!name || !description || !address || !price || !supraface || photos.length === 0) {
            toast.error("All fields and at least one image are required");
            return;
        }

        const toastId = toast.loading('Creating property...');
    
        try {
            const images = await uploadPropertyImages(); // Get all image URLs
    
            // Define a common object to hold the property details
            let propertyData = {
                name,
                description,
                address,
                link,
                price,
                supraface,
                images, // Send array of image URLs
                region,
                sector,
                floor,      // Ensure these attributes are included
                floors,
                locativeFont,
                propertyCondition,
                heatingType,
                rooms,
                baths,
                balcony,
                parking,
            };
    
            let apiEndpoint = '';
    
            // Define the API endpoint and additional fields based on formDisplay
            switch (formDisplay) {
                case 1: // Apartamente
                    apiEndpoint = '/api/apartamente';
                    break;
                case 2: // Case
                    apiEndpoint = '/api/case';
                    break;
                case 3: // Spatii Comerciale
                    apiEndpoint = '/api/comercial';
                    break;
                case 4: // Terenuri
                    apiEndpoint = '/api/terenuri';
                    break;
                default:
                    throw new Error("Invalid property type");
            }
    
            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),  // Send the full property data object
            });
    
            if (!res.ok) {
                throw new Error("Error occurred");
            }
    
            const property = await res.json();
            // Update the loading toast to success
            toast.success('Property created successfully!', {
                id: toastId,  // Pass the same toastId to update the loading toast
            });    
            router.push(`/imobil/${property?._id}?type=${val}`);
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while creating the property', {
                id: toastId,  // Pass the same toastId to update the loading toast
            });
        }
    };
    
    

    return (
        <section className="flex flex-col gap-4 pb-12">
            {/* CREATE AGENT (visible for admin users) */}
            {session?.user.type === 'admin' ?
                <form onSubmit={handleAgentSubmit}>
                    <h2 className="text-white text-3xl mb-4">Creare Agent</h2>

                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
                        {/* Form fields for agent creation */}
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Nume</h4>
                            <input
                                type="text"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                placeholder="Nume agent"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>

                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Email</h4>
                            <input
                                type="text"
                                value={agentEmail}
                                onChange={(e) => setAgentEmail(e.target.value)}
                                placeholder="exemplu@gmail.com"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Parola</h4>
                            <input
                                type="password"
                                value={agentPass}
                                onChange={(e) => setAgentPass(e.target.value)}
                                placeholder="Introdu parola"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Poză</h4>
                            <input
                                type="file"
                                onChange={(e) => setAgentPhoto(e.target.files[0])} // Handle single file selection
                                className="bg-lightGrey p-3 rounded-2xl text-white w-full"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-white p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
                :
                <></>
            }
            <div className='flex flex-row gap-4 pt-10'>
                <button
                    className={`w-40 h-10 duration-300 ease-in ${formDisplay === 1 ? 'bg-white text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(1)}>
                    Apartamente
                </button>
                <button
                    className={`w-40 h-10 duration-300 ease-in ${formDisplay === 2 ? 'bg-white text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(2)}>
                    Case
                </button>
                <button
                    className={`w-40 h-10 duration-300 ease-in ${formDisplay === 3 ? 'bg-white text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(3)}>
                    Spatii Comerciale
                </button>
                <button
                    className={`w-40 h-10 duration-300 ease-in ${formDisplay === 4 ? 'bg-white text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(4)}>
                    Terenuri
                </button>
            </div>

            {/* Conditionally render the appropriate form */}
            {formDisplay === 1 && (
                <form onSubmit={(e) => {handlePropertySubmit(e, 'apartamente')} }>
                <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Titlu</h4>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Apartament cu 2 camere"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere</h4>
                            <textarea
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Apartament cu 2 camere in zona de lux..."
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Strada</h4>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Link</h4>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="Enter Link"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Imagini</h4>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setPhotos([...e.target.files])} // Handle multiple file selection
                                className="bg-lightGrey p-3 rounded-2xl text-white w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <div className="flex flex-col gap-4 bg-matteBlack p-4 h-[200px] w-[500px] rounded-xl border border-solid border-white">
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Suprafata Totală</h4>
                                <input
                                    type="number"
                                    value={supraface}
                                    onChange={(e) => setSupraface(Number(e.target.value))}
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                                <h4 className="text-white text-lg">m2</h4>
                            </div>

                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Pret</h4>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                            </div>
                            <div className="w-full flex flex-row items-center justify-start gap-2">
                                <h4 className="w-fit text-white text-lg">Stare Imobil</h4>
                                <select
                                    value={propertyCondition}
                                    onChange={(e) => setPropertyCondition(e.target.value)}
                                    className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                >
                                    <option value="Reparație euro">Reparație euro</option>
                                    <option value="Reparație mediu">Reparație mediu</option>
                                    <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-matteBlack flex flex-col p-4 gap-4 w-[500px] rounded-xl border border-solid border-white">
                            {/* Regiune  */}
                            <div className="flex flex-row items-center justify-center gap-2">
                                <h4 className="text-white text-lg">Regiune</h4>
                                <select
                                    value={region}
                                    onChange={(e) => { setRegion(e.target.value); setSector(''); }}
                                    className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                >
                                    <option value="Chişinău">Chişinău</option>
                                    <option value="Suburbii">Suburbii</option>
                                </select>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-2">
                                <h4 className="text-white text-lg">Sector/Suburbie</h4>
                                <select
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                    className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                >
                                    <option value="">Selectează Sector/Suburbie</option>
                                    {sectorsByRegion[region].map((sec) => (
                                        <option key={sec} value={sec}>{sec}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-row items-center justify-start gap-3 ">
                                <h4 className="text-white text-lg">Font Locativ</h4>
                                <button
                                    type='button'
                                    onClick={(e) => setLocativeFont('Bloc Nou')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${locativeFont === 'Bloc Nou' ? 'text-matteBlack bg-white' : 'text-white bg-lightGrey'} `}
                                >Bloc Nou</button>
                                <button
                                    type='button'
                                    onClick={(e) => setLocativeFont('Bloc Vechi')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${locativeFont === 'Bloc Vechi' ? 'text-matteBlack bg-white' : 'text-white bg-lightGrey'} `}
                                >Bloc Vechi</button>
                            </div>
                        </div>
                        <div className="bg-matteBlack flex flex-col p-4 gap-4 w-[500px] rounded-xl border border-solid border-white">
                            <div className='flex flex-row items-center justify-start gap-6'>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Camere</h4>
                                    <input
                                        type="number"
                                        value={rooms}
                                        onChange={(e) => setRooms(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Băi</h4>
                                    <input
                                        type="number"
                                        value={baths}
                                        onChange={(e) => setBaths(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Balcoane</h4>
                                    <input
                                        type="number"
                                        value={balcony}
                                        onChange={(e) => setBalcony(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-6 '>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Nivele</h4>
                                    <input
                                        type="number"
                                        value={floors}
                                        onChange={(e) => setFloors(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nivel</h4>
                                    <input
                                        type="number"
                                        value={floor}
                                        onChange={(e) => setFloor(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-center gap-2">

                                    <h4 className="text-white text-lg">Încălzire</h4>
                                    <select
                                        value={heatingType}
                                        onChange={(e) => { setheatingType(e.target.value); }}
                                        className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                    >
                                        <option value="Autonomă">Autonomă</option>
                                        <option value="Centralizată">Centralizată</option>
                                    </select>
                                </div>

                            </div>



                            <div className="flex flex-row items-center justify-start gap-3">
                                <h4 className="text-white text-lg">Parcare</h4>
                                <button
                                    type="button"
                                    onClick={() => setParking('Subterana')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${parking === 'Subterana' ? 'text-matteBlack bg-white' : 'text-white bg-lightGrey'}`}
                                >
                                    Subterana
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setParking('Curte')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${parking === 'Curte' ? 'text-matteBlack bg-white' : 'text-white bg-lightGrey'}`}
                                >
                                    Curte
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setParking('Garaj')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${parking === 'Garaj' ? 'text-matteBlack bg-white font-semibold' : 'text-white bg-lightGrey'}`}
                                >
                                    Garaj
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-mainOrange w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}

            {formDisplay === 2 && (
                <form onSubmit={(e) => {handlePropertySubmit(e, 'case')} }>
                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Titlu</h4>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Apartament cu 2 camere"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere</h4>
                            <textarea
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Apartament cu 2 camere in zona de lux..."
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Strada</h4>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Link</h4>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="Enter Link"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Imagini</h4>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setPhotos([...e.target.files])} // Handle multiple file selection
                                className="bg-lightGrey p-3 rounded-2xl text-white w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <div className="flex flex-col gap-4 bg-matteBlack p-4  w-[500px] rounded-xl border border-solid border-white">
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Suprafata Totală</h4>
                                <input
                                    type="number"
                                    value={supraface}
                                    onChange={(e) => setSupraface(Number(e.target.value))}
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                                <h4 className="text-white text-lg">m2</h4>
                            </div>

                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Pret</h4>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                            </div>

                        </div>

                        <div className="bg-matteBlack flex flex-col p-4 gap-4 w-[500px] rounded-xl border border-solid border-white">
                            {/* Regiune  */}
                            <div className="flex flex-row items-center justify-center gap-2">
                                <h4 className="text-white text-lg">Regiune</h4>
                                <select
                                    value={region}
                                    onChange={(e) => { setRegion(e.target.value); setSector(''); }}
                                    className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                >
                                    <option value="Chişinău">Chişinău</option>
                                    <option value="Suburbii">Suburbii</option>
                                </select>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-2">
                                <h4 className="text-white text-lg">Sector/Suburbie</h4>
                                <select
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                    className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                >
                                    <option value="">Selectează Sector/Suburbie</option>
                                    {sectorsByRegion[region].map((sec) => (
                                        <option key={sec} value={sec}>{sec}</option>
                                    ))}
                                </select>
                            </div>


                        </div>
                        <div className="bg-matteBlack flex flex-col p-4 gap-4 w-[500px] rounded-xl border border-solid border-white">

                            <div className="w-full flex flex-row items-center justify-start gap-2">
                                <h4 className="w-fit text-white text-lg">Stare Imobil</h4>
                                <select
                                    value={propertyCondition}
                                    onChange={(e) => setPropertyCondition(e.target.value)}
                                    className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                >
                                    <option value="Reparație euro">Reparație euro</option>
                                    <option value="Reparație mediu">Reparație mediu</option>
                                    <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
                                </select>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-6'>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Camere</h4>
                                    <input
                                        type="number"
                                        value={rooms}
                                        onChange={(e) => setRooms(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Băi</h4>
                                    <input
                                        type="number"
                                        value={baths}
                                        onChange={(e) => setBaths(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Nivele</h4>
                                    <input
                                        type="number"
                                        value={floors}
                                        onChange={(e) => setFloors(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-white w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}

            {formDisplay === 3 && (
                <form onSubmit={(e) => {handlePropertySubmit(e, 'comercial')} }>
                <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Titlu</h4>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Apartament cu 2 camere"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere</h4>
                            <textarea
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Apartament cu 2 camere in zona de lux..."
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Strada</h4>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Link</h4>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="Enter Link"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Imagini</h4>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setPhotos([...e.target.files])} // Handle multiple file selection
                                className="bg-lightGrey p-3 rounded-2xl text-white w-full"
                            />
                        </div>
                        {/* Destinatie  */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Destinatie</h4>
                            <select
                                value={region}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Comercial">Comercial</option>
                                <option value="Birouri">Birouri</option>
                                <option value="Depozit">Depozit/Producere</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Regiune</h4>
                            <select
                                value={region}
                                onChange={(e) => { setRegion(e.target.value); setSector(''); }}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Chişinău">Chişinău</option>
                                <option value="Suburbii">Suburbii</option>
                            </select>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Sector/Suburbie</h4>
                            <select
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="">Selectează Sector/Suburbie</option>
                                {sectorsByRegion[region].map((sec) => (
                                    <option key={sec} value={sec}>{sec}</option>
                                ))}
                            </select>
                        </div>


                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-white text-lg">Suprafata Totală</h4>
                            <input
                                type="number"
                                value={supraface}
                                onChange={(e) => setSupraface(Number(e.target.value))}
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                            <h4 className="text-white text-lg">m2</h4>
                        </div>

                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-white text-lg">Pret</h4>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-white w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}

            {formDisplay === 4 && (
                <form onSubmit={(e) => {handlePropertySubmit(e, 'terenuri')} }>
                <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Titlu</h4>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Apartament cu 2 camere"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere</h4>
                            <textarea
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Apartament cu 2 camere in zona de lux..."
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Strada</h4>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Link</h4>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="Enter Link"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Imagini</h4>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setPhotos([...e.target.files])} // Handle multiple file selection
                                className="bg-lightGrey p-3 rounded-2xl text-white w-full"
                            />
                        </div>
                        {/* Destinatie  */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Destinatie</h4>
                            <select
                                value={region}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Comercial">Construcție</option>
                                <option value="Birouri">Agricol</option>
                                <option value="Depozit">Pomicol</option>
                            </select>
                        </div>
                        {/* Regiune  */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Regiune</h4>
                            <select
                                value={region}
                                onChange={(e) => { setRegion(e.target.value); setSector(''); }}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Chişinău">Chişinău</option>
                                <option value="Suburbii">Suburbii</option>
                            </select>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Sector/Suburbie</h4>
                            <select
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="">Selectează Sector/Suburbie</option>
                                {sectorsByRegion[region].map((sec) => (
                                    <option key={sec} value={sec}>{sec}</option>
                                ))}
                            </select>
                        </div>


                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-white text-lg">Suprafata Totală</h4>
                            <input
                                type="number"
                                value={supraface}
                                onChange={(e) => setSupraface(Number(e.target.value))}
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                            <h4 className="text-white text-lg">ari</h4>
                        </div>

                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-white text-lg">Pret</h4>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-white w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}
        </section>
    );
};

export default Dashboard;