"use client";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    const router = useRouter();

     // State variables
     const [name, setName] = useState('');
     const [description, setDesc] = useState('');
     const [address, setAddress] = useState('');
     const [photos, setPhotos] = useState([]); // Store multiple photos
     const [link, setLink] = useState('');
     const [floor, setFloor] = useState(0);
     const [floors, setFloors] = useState(0);
     const [locativeFont, setLocativeFont] = useState('');
     const [rooms, setRooms] = useState(0);
     const [baths, setBaths] = useState(0);
     const [balcony, setBalcony] = useState(0);
     const [parking, setParking] = useState('');
     const [type, setType] = useState('Apartament');
     const [price, setPrice] = useState(0);
     const [supraface, setSupraface] = useState(0);
     const [enableDash, setEnableDash] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        console.log(token)
        if (!token) {
            // If no token is found, redirect to the home page
            toast.error("You must be logged in to access the dashboard.");
            setEnableDash(false);
            router.push('/');
        } else {
            // Optionally, you can verify the token by making an API request
            setEnableDash(true);
            verifyToken(token);
        }
    }, [router]);

    const verifyToken = async (token) => {
        console.log(token);
        const res = await fetch('/api/protected', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        if (!res.ok) {
            toast.error("Invalid or expired token. Please log in again.");
            router.push('/');
        }
    };

   

    // Function to upload multiple images to Cloudinary
    const uploadImages = async () => {
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

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !address || !price || !rooms || !supraface || photos.length === 0) {
            toast.error("All fields and at least one image are required");
            return;
        }

        try {
            const images = await uploadImages(); // Get all image URLs

            const res = await fetch(`/api/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    address,
                    link,
                    floor,
                    floors,
                    locativeFont,
                    rooms,
                    baths,
                    balcony,
                    parking,
                    type,
                    price,
                    supraface,
                    images, // Send array of image URLs
                }),
            });
            if (!res.ok) {
                throw new Error("Error occurred");
            }

            const property = await res.json();
            // let body = {
            //     name,
            //     desc,
            //     address,
            //     link,
            //     floor,
            //     floors,
            //     locativeFont,
            //     rooms,
            //     baths,
            //     balcony,
            //     parking,
            //     type,
            //     price,
            //     supraface,
            //     imageUrls, // Send array of image URLs
            // }
            // console.log(body)
            toast.success('Anunt creat cu success')
            router.push(`/imobil/${property?._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
      (
        enableDash? 
        <section className="flex flex-col gap-4">
            <h2 className="text-mainOrange text-3xl">Creare Anunt Imobil</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-mainOrange">
                    <div className="flex flex-col items-start justify-start gap-2">
                        <h4 className="text-mainOrange text-lg">Adaugă Titlu</h4>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Apartament cu 2 camere"
                            className="w-full bg-lightGrey p-2 rounded-xl text-mainOrange"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <h4 className="text-mainOrange text-lg">Adaugă Descriere</h4>
                        <textarea
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Apartament cu 2 camere in zona de lux..."
                            className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <h4 className="text-mainOrange text-lg">Strada</h4>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="str. Stefan cel Mare"
                            className="w-full bg-lightGrey p-2 rounded-xl text-mainOrange"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <h4 className="text-mainOrange text-lg">Link</h4>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter Link"
                            className="w-full bg-lightGrey p-2 rounded-xl text-mainOrange"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <h4 className="text-mainOrange text-lg">Adaugă Imagini</h4>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setPhotos([...e.target.files])} // Handle multiple file selection
                            className="bg-lightGrey p-3 rounded-2xl text-mainOrange w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-4">
                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-[360px] w-[500px] rounded-xl border border-solid border-mainOrange">
                        <div className="flex flex-row items-center justify-start gap-3 ">
                            <h4 className="text-mainOrange text-lg">Font Locativ</h4>
                            <button
                                type='button'
                                onClick={(e) => setLocativeFont('Construcţii Noi')}
                                className={`p-3 rounded-2xl duration-300 ease-in ${locativeFont === 'Construcţii Noi' ? 'text-matteBlack bg-mainOrange' : 'text-mainOrange bg-lightGrey'} `}
                            >Construcţii Noi</button>
                            <button
                                type='button'
                                onClick={(e) => setLocativeFont('Secundare')}
                                className={`p-3 rounded-2xl duration-300 ease-in ${locativeFont === 'Secundare' ? 'text-matteBlack bg-mainOrange' : 'text-mainOrange bg-lightGrey'} `}
                            >Secundare</button>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-mainOrange text-lg">Nr. de Camere</h4>
                            <input
                                type="number"
                                value={rooms}
                                onChange={(e) => setRooms(Number(e.target.value))}
                                className="w-[50px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-mainOrange text-lg">Grup sanitar</h4>
                            <input
                                type="number"
                                value={baths}
                                onChange={(e) => setBaths(Number(e.target.value))}
                                className="w-[50px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-mainOrange text-lg">Balcon/ lojie</h4>
                            <input
                                type="number"
                                value={balcony}
                                onChange={(e) => setBalcony(Number(e.target.value))}
                                className="w-[50px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-mainOrange text-lg">Pret</h4>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-mainOrange text-lg">Suprafata Totala</h4>
                            <input
                                type="number"
                                value={supraface}
                                onChange={(e) => setSupraface(Number(e.target.value))}
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                            />
                            <h4 className="text-mainOrange text-lg">m2</h4>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-[360px]">
                        <div className="bg-matteBlack p-4 w-[500px] rounded-xl border border-solid border-mainOrange">
                            <h4 className="text-mainOrange text-lg mb-5">Tip de proprietate</h4>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-mainOrange"
                            >
                                <option value="Apartament">Apartamente</option>
                                <option value="Case">Case</option>
                                <option value="Comercial">Spații Comerciale</option>
                                <option value="Terenuri">Terenuri</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-4 bg-matteBlack p-4 w-[500px] rounded-xl border border-solid border-mainOrange">
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-mainOrange text-lg">Nivel</h4>
                                <input
                                    type="number"
                                    value={floor}
                                    onChange={(e) => setFloor(Number(e.target.value))}
                                    className="w-[50px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                                />
                            </div>
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-mainOrange text-lg">Nr. de Nivele</h4>
                                <input
                                    type="number"
                                    value={floors}
                                    onChange={(e) => setFloors(Number(e.target.value))}
                                    className="w-[50px] bg-lightGrey p-2 rounded-xl text-mainOrange"
                                />
                            </div>
                            <div className="flex flex-row items-center justify-start gap-3">
                                <h4 className="text-mainOrange text-lg">Parcare</h4>
                                <button
                                    type="button"
                                    onClick={() => setParking('Subterana')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${parking === 'Subterana' ? 'text-matteBlack bg-mainOrange' : 'text-mainOrange bg-lightGrey'}`}
                                >
                                    Subterana
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setParking('Curte')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${parking === 'Curte' ? 'text-matteBlack bg-mainOrange' : 'text-mainOrange bg-lightGrey'}`}
                                >
                                    Curte
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setParking('Garaj')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${parking === 'Garaj' ? 'text-matteBlack bg-mainOrange font-semibold' : 'text-mainOrange bg-lightGrey'}`}
                                >
                                    Garaj
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-mainOrange p-3 rounded-xl text-white mt-4">Submit</button>
            </form>
        </section>
        : 
        <></>
      )
    );
};

export default Dashboard;
