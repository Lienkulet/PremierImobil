"use client";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PasswordUpdateForm from '@/components/PasswordUpdateForm';
import AWS from 'aws-sdk';

const Dashboard = () => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    const router = useRouter();
    const { data: session, status } = useSession();
    const [formDisplay, setFormDisplay] = useState(1); // Default formDisplay set to 1
    const [passwordForm, setPasswordForm] = useState(""); // 'create' or 'update'

    // State for the list of agents
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState('');

    // State variables for property creation
    const [name, setName] = useState('');
    const [propertyCondition, setPropertyCondition] = useState('');
    const [description, setDesc] = useState(`Se vinde apartament cu 2 camere + living,
     în complexul locativ Sprancenoaia, construit de compania Basconslux, amplasat în sectorul Telecentru,
      str. Sprâncenoaia 3/h.Suprafața 65 m2, etajul 3/11. Compartimentare: antreu, 2 dormitoare, bucătărie, 
      living, bloc sanitar, (garderobă).`);

    const [characteristics, setCharacterisitics] = useState(`-localizare bilaterală;
    - localizare de mijloc; -mobilă + tehnică de uz casnic; 
   -parchet/laminat 
   - sistem de aer condiționat Vara/Iarna;
   - încălzire autonomă cu cazan german Bosch; 
   - geamuri termopane Low-E cu 5 camere; 
   - izolare termică cu vată minerală ;
   - izolare fonică; 
   - ușă blindată; 
   - ascensor silențios; 
   - teren de joacă pentru copii; - acces securizat și supraveghere video;
   - parcare subterană; 
   -zonă de relaxare pentru maturi; 
   -fațadă din cărămidă roșie; 
   - curte de tip inchis; 
   -pază; 
   -balcon; 
   -terasă 
   -debara 
   -încălzire prin pardoseală; -casă de tip club; 
   -mașină de spălat vase; -mașină de spălat haine -mașină de uscat haine 
   -Fasadă Ventilată-Interfon ”домофон”`);
    const [descriptionFooter, setDescriptionFooter] = useState(`Imobilul poate fi cumpărat în credit cu doar 30% aport propriu! Ajutor pe întreg procesul, 
    procesul de vânzare-cumpărare a unui imobil (economisiți timp, nervi și bani). Consultanță juridică 
    în domeniul imobiliar (verificarea și pregătirea actelor necesare pentru tranzacție); Consultanță 
    profesionistă cu privire la accesarea unui credit ipotecar; Consultanță gratuită cu privire la prețurile 
    reale de piață; Cumpărând imobil prin compania Premier Imobil beneficiați de servicii imobiliare profesioniste
     absolut GRATUIT!`);

    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]); // Store multiple photos
    const [link, setLink] = useState('');
    const [linkName, setLinkName] = useState('');
    const [category, setCategory] = useState('Exclusive');
    const [tipAnunt, setTipAnunt] = useState('Vânzare');
    const [floor, setFloor] = useState(1);
    const [floors, setFloors] = useState(1);
    const [locativeFont, setLocativeFont] = useState('Bloc Nou');
    const [rooms, setRooms] = useState();
    const [baths, setBaths] = useState();
    const [balcony, setBalcony] = useState();
    const [parking, setParking] = useState('Subterana');
    const [typeAgent, setTypeAgent] = useState('Agent');
    const [price, setPrice] = useState(1);
    const [supraface, setSupraface] = useState(1);
    const [heatingType, setheatingType] = useState("Autonomă");
    const [destination, setDestination] = useState("Autonomă");
    const [recomandate, setrecomandate] = useState(false);

    // State variables for agent creation
    const [agentName, setAgentName] = useState('');
    const [agentEmail, setAgentEmail] = useState('');
    const [agentPhone, setAgentPhone] = useState('');
    const [agentPass, setAgentPass] = useState('');
    const [agentPhoto, setAgentPhoto] = useState(null); // Store agent's photo

    // State for regions
    const [region, setRegion] = useState('Chişinău');
    const [sector, setSector] = useState('');
    // Available sectors based on the selected region
    const sectorsByRegion = {
        'Chişinău': ['Buiucani', "Sculeanca", 'Centru', 'Botanica', 'Telecentru', "Poșta Veche", "Aeroport"],
        'Suburbii': [
            'Anenii Noi', 'Truşeni', 'Durleşti', 'Băcioi', 'Bubuieci', 'Ciorescu',
            'Codru', 'Cricova', 'Dumbrava', 'Ialoveni', 'Măgdăceşti', 'Stăuceni',
            'Tohatin', 'Vadul lui Vodă', 'Cojuşna', 'Budeşti', 'Sîngera', 'Cruzesti',
            'Străşeni', 'Orhei', 'Ghidighici', 'Grătieşti', 'Vatra', 'Coloniţa',
            'Cheltuitori', 'Cahul', 'Peresecina'
        ]
    };


    const s3 = new AWS.S3({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
    });

    // Fetch the list of agents on component mount
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await fetch('/api/agent');
                const data = await res.json();
                setAgents(data); // Assuming data is an array of agents
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };

        fetchAgents();
    }, []);

    // Automatically set the logged-in agent for non-admin users
    useEffect(() => {
        console.log(session?.user.type + ' ' + session?.user._id)
        if (session?.user.type === 'agent') {
            setSelectedAgent(session.user._id); // Automatically set the logged-in user as the agent
        }
    }, [session]);

    // Function to upload agent photo 
    const uploadAgentPhoto = async () => {
        if (!agentPhoto) return '';
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: `agent-photos/${Date.now()}-${agentPhoto.name}`,
            Body: agentPhoto,
            ContentType: agentPhoto.type,
        };

        try {
            const data = await s3.upload(params).promise();
            return data.Location;
        } catch (error) {
            console.error("Error uploading agent photo to S3:", error);
            return '';
        }
    };

    // Function to handle form submission for agent creation
    const handleAgentSubmit = async (e) => {
        e.preventDefault();
        if (!agentName) {
            toast.error("Numele agentului este obligatoriu");
        }
        if (!agentEmail) {
            toast.error("Email-ul agentului este obligatoriu");
        }
        if (!agentPass) {
            toast.error("Parola agentului este obligatorie");
        }
        if (!agentName || !agentEmail || !agentPass) {
            return;
        }

        // Show loading toast
        const toastId = toast.loading("Loading");

        try {
            // Upload the agent's photo and get the URL
            const uploadedPhotoUrl = await uploadAgentPhoto();

            const res = await fetch(`/api/agent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: agentName,
                    email: agentEmail,
                    phoneNr: agentPhone,
                    password: agentPass,
                    photoUrl: uploadedPhotoUrl,
                    type: typeAgent
                }),
            });

            if (!res.ok) {
                throw new Error("Error occurred while creating agent");
            }

            // Update the toast to success
            toast.success('Agent creat cu success', { id: toastId });

            // Clear the form inputs
            setAgentName('');
            setAgentEmail('');
            setAgentPhone('');
            setAgentPass('');
            setAgentPhoto(null); // Clear the photo input

        } catch (error) {
            // Update the toast to error
            toast.error('Something went wrong', { id: toastId });
            console.error(error);
        }
    };


    // Function to upload multiple property images to Cloudinary
    const uploadPropertyImages = async () => {
        if (photos.length === 0) return [];

        const imageUrls = [];

        for (let i = 0; i < photos.length; i++) {
            const params = {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
                Key: `property-photos/${Date.now()}-${photos[i].name}`,
                Body: photos[i],
                ContentType: photos[i].type,
            };

            try {
                const data = await s3.upload(params).promise();
                imageUrls.push(data.Location); // Add the uploaded image URL to array
            } catch (error) {
                console.log("Error uploading property image to S3:", error);
            }
        }

        return imageUrls;
    };


    // Function to handle form submission for property creation
    const handlePropertySubmit = async (e, val) => {
        e.preventDefault();
        console.log(selectedAgent)
        if (!selectedAgent) {
            toast.error("Agentul selectat este obligatoriu");
        }
        if (recomandate === '') {
            toast.error("Recomandarea este obligatorie");
        }
        if (!description) {
            toast.error("Descrierea este obligatorie");
        }
        if (!address) {
            toast.error("Adresa este obligatorie");
        }
        if (!price) {
            toast.error("Prețul este obligatoriu");
        }
        if (!sectorsByRegion) {
            toast.error("Sectorul este obligatoriu");
        }
        if (!supraface) {
            toast.error("Suprafața este obligatorie");
        }
        if (!rooms) {
            toast.error("Nr camere este obligatorie");
        }
        if (photos.length === 0) {
            toast.error("Cel puțin o imagine este obligatorie");
        }
        if (!selectedAgent || recomandate === '' || !description || !address || !price ||
            !sectorsByRegion || !supraface || photos.length === 0) {
            // toast.error("Toate câmpurile și cel puțin o imagine sunt obligatorii");
            // console.log(selectedAgent,' ',description,' ',address, ' ', price, ' ',supraface,' ',photos.length)
            return;
        }

        const toastId = toast.loading('Creating property...');

        try {
            const images = await uploadPropertyImages(); // Get all image URLs
            // Define a common object to hold the property details
            let propertyData = {
                description,
                characteristics,
                descriptionFooter,
                address,
                link,
                linkName,
                price,
                supraface,
                category,
                tipAnunt,
                images,
                region,
                sector,
                floor,
                floors,
                locativeFont,
                propertyCondition,
                heatingType,
                rooms,
                baths,
                balcony,
                parking,
                agentId: selectedAgent,
                recomandate
            };

            let apiEndpoint = '';
            let namee = '';

            // Define the API endpoint and additional fields based on formDisplay
            switch (formDisplay) {
                case 1: // Apartamente
                    apiEndpoint = '/api/apartamente';
                    namee = `Apartament cu ${rooms}, ${address}, ${region}, ${sector}`
                    break;
                case 2: // Case
                    apiEndpoint = '/api/case';
                    namee = `Casă cu ${floors} nivele, ${address}, ${region}, ${sector}`
                    break;
                case 3: // Spatii Comerciale
                    apiEndpoint = '/api/comercial';
                    namee = `Spaţiu Comercial, ${address}, ${region}, ${sector}`
                    break;
                case 4: // Terenuri
                    apiEndpoint = '/api/terenuri';
                    namee = `Teren, ${address}, ${region}, ${sector}`
                    break;
                default:
                    throw new Error("Invalid property type");
            }

            setName(namee);
            propertyData.name = namee;
            console.log(propertyData.recomandate + ' ' + propertyData.name)
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
                id: toastId,
            });
            router.push(`/imobil/${property?._id}?type=${val}`);
        } catch (error) {
            console.log(error);
            toast.error('A apărut o eroare la crearea proprietății', {
                id: toastId,
            });
        }
    };


    if (status === 'unauthenticated') {
        return <h1 className="h-screen flex items-center justify-center text-white text-5xl">Acces Interzis</h1>
    }
    return (
        <section className="flex flex-col gap-4 pb-12">
            {/* CREATE AGENT (visible for admin users) */}
            {session?.user.type === 'admin' ?
                <div className='w-full'>
                    <div className="flex flex-col md:flex-row items-start justify-start gap-4 pt-4 py-4">
                        <button
                            className={`w-full md:w-40 h-12 duration-300 ease-in ${passwordForm === "create" ? 'bg-mainOrange' : 'bg-matteBlack'} border border-solid border-white  text-white rounded-xl font-normal`}
                            onClick={() => setPasswordForm("create")}
                        >
                            Creare Agent
                        </button>
                        <button
                            className={`w-full md:w-40 h-12 duration-300 ease-in ${passwordForm === "update" ? 'bg-mainOrange' : 'bg-matteBlack'} border border-solid border-white text-white rounded-xl font-normal`}
                            onClick={() => setPasswordForm("update")}
                        >
                            Schimbare Parola
                        </button>
                    </div>

                    {/* Conditionally render the password forms */}
                    {passwordForm === "update" && <PasswordUpdateForm />}
                    {passwordForm === "create" &&
                        <form onSubmit={handleAgentSubmit}>
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
                                    <h4 className="text-white text-lg">Telefon</h4>
                                    <input
                                        type="text"
                                        value={agentPhone}
                                        onChange={(e) => setAgentPhone(e.target.value)}
                                        placeholder="078789732"
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
                                <div className='flex flex-row gap-4'>
                                    <div className="flex flex-col items-start justify-start gap-2">
                                        <h4 className="text-white text-lg">Tip Cont</h4>
                                        <select
                                            value={typeAgent}
                                            onChange={(e) => setTypeAgent(e.target.value)}
                                            className="w-full md:w-fit bg-matteBlack border border-solid border-white p-3 rounded-xl text-white"
                                        >
                                            <option key='admin' value='admin'>Admin</option>
                                            <option key='agent' value='agent'>Agent</option>
                                        </select>
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

                            </div>

                            <button type="submit" className="w-full bg-mainOrange p-3 rounded-xl text-white mt-4">Adaugă</button>
                        </form>}

                </div>

                :
                <></>
            }
            <div className='flex flex-col md:flex-row items-center justify-center gap-4 pt-10'>
                <button
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${formDisplay === 1 ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(1)}>
                    Apartamente
                </button>
                <button
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${formDisplay === 2 ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(2)}>
                    Case
                </button>
                <button
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${formDisplay === 3 ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(3)}>
                    Spatii Comerciale
                </button>
                <button
                    className={`w-full md:w-40 h-12 duration-300 ease-in ${formDisplay === 4 ? 'bg-mainOrange text-white' : 'bg-matteBlack border border-solid border-white text-white'} rounded-xl font-normal`}
                    onClick={() => setFormDisplay(4)}>
                    Terenuri
                </button>
                {/* Only show agent selection for admin users */}
                {session?.user.type === 'admin' ? (
                    <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}
                        className="w-full bg-matteBlack border border-solid border-white p-3 rounded-xl text-white"
                    >
                        <option key='1' value="">Alege Agent</option>
                        {agents.map((agent) => (
                            <option key={agent._id} value={agent._id}>
                                {agent.name}
                            </option>
                        ))}
                    </select>
                ) : null}
                <select
                    value={recomandate}
                    onChange={(e) => { setrecomandate(e.target.value === 'true' ? true : false); console.log(recomandate) }}
                    className="w-full md:w-fit bg-matteBlack border border-solid border-white p-3 rounded-xl text-white"
                >
                    <option value="">Adauga Recomandate</option>
                    <option key='true' value='true'>Da</option>
                    <option key='false' value='false'>Nu</option>
                </select>
            </div>

            {/* Conditionally render the appropriate form */}
            {formDisplay === 1 && (
                <form onSubmit={(e) => { handlePropertySubmit(e, 'apartamente') }}>
                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
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
                            <h4 className="text-white text-lg">Adaugă Caracterstici</h4>
                            <textarea
                                value={characteristics}
                                onChange={(e) => setCharacterisitics(e.target.value)}
                                placeholder="-usa blindata"
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere Final</h4>
                            <textarea
                                value={descriptionFooter}
                                onChange={(e) => setDescriptionFooter(e.target.value)}
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
                            <h4 className="text-white text-lg">Nume Link</h4>
                            <input
                                type="text"
                                value={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                                placeholder="V14 sau E20"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
                            <h4 className="text-white text-lg">Link</h4>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="Link URL"
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
                        <div className="flex flex-col md:flex-row items-start justify-start gap-2">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value=""></option>
                                <option value="Exclusive">Exclusive</option>
                                <option value="Rezervat">Rezervat</option>
                                <option value="Vândut">Vândut</option>
                            </select>
                            <select
                                value={tipAnunt}
                                onChange={(e) => setTipAnunt(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Chirie">Chirie</option>
                                <option value="Vânzare">Vânzare</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <div className="flex flex-col gap-4 bg-matteBlack p-4 md:h-[200px] md:w-[500px] rounded-xl border border-solid border-white">
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Suprafata Totală</h4>
                                <input
                                    type="text"  // Change the input type to text
                                    value={supraface === 0 ? '' : supraface}  // Handle empty case
                                    onChange={(e) => setSupraface(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                                <h4 className="text-white text-lg">m2</h4>
                            </div>


                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Pret</h4>
                                <input
                                    type="text"  // Change the input type to text
                                    value={price === 0 ? '' : price}  // Handle empty case
                                    onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
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

                        <div className="bg-matteBlack flex flex-col p-4 gap-4 md:w-[500px] rounded-xl border border-solid border-white">
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
                                    onClick={(e) => setLocativeFont('Bloc Secundar')}
                                    className={`p-3 rounded-2xl duration-300 ease-in ${locativeFont === 'Bloc Secundar' ? 'text-matteBlack bg-white' : 'text-white bg-lightGrey'} `}
                                >Bloc Secundar</button>
                            </div>
                        </div>
                        <div className="bg-matteBlack flex flex-col p-4 gap-4 md:w-[500px] rounded-xl border border-solid border-white">
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <select className="w-full bg-lightGrey p-3 rounded-xl text-white"
                                    value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}>
                                    <option value="">Nr. camere</option>
                                    <option value="1 Cameră">1 Cameră</option>
                                    <option value="1 Cameră+Living">1 Cameră+Living</option>
                                    <option value="2 Camere">2 Camere</option>
                                    <option value="2 Camere+living">2 Camere+Living</option>
                                    <option value="3 Camere">3 Camere</option>
                                    <option value="3 Camere+living">3 Camere+Living</option>
                                    <option value="4 Camere">4 Camere</option>
                                    <option value="4 Camere+living">4 Camere+Living</option>
                                    <option value="5+ Camere+">5+ Camere</option>
                                </select>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Băi</h4>
                                    <input
                                        type="number"
                                        value={baths}
                                        min='1'
                                        onChange={(e) => setBaths(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Balcoane</h4>
                                    <input
                                        type="number"
                                        value={balcony}
                                        min='1'
                                        onChange={(e) => setBalcony(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 md:gap-6 '>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Nivele</h4>
                                    <input
                                        type="number"
                                        value={floors}
                                        min='1'
                                        onChange={(e) => setFloors(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nivel</h4>
                                    <input
                                        type="number"
                                        value={floor}
                                        min='1'
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
                <form onSubmit={(e) => { handlePropertySubmit(e, 'case') }}>
                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
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
                            <h4 className="text-white text-lg">Adaugă Caracterstici</h4>
                            <textarea
                                value={characteristics}
                                onChange={(e) => setCharacterisitics(e.target.value)}
                                placeholder="-usa blindata"
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere Final</h4>
                            <textarea
                                value={descriptionFooter}
                                onChange={(e) => setDescriptionFooter(e.target.value)}
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
                            <h4 className="text-white text-lg">Nume Link</h4>
                            <input
                                type="text"
                                value={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
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
                        <div className="flex flex-col md:flex-row items-start justify-start gap-2">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value=""></option>
                                <option value="Exclusive">Exclusive</option>
                                <option value="Rezervat">Rezervat</option>
                                <option value="Vândut">Vândut</option>
                            </select>
                            <select
                                value={tipAnunt}
                                onChange={(e) => setTipAnunt(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Chirie">Chirie</option>
                                <option value="Vânzare">Vânzare</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <div className="flex flex-col gap-4 bg-matteBlack p-4  md:w-[500px] rounded-xl border border-solid border-white">
                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Suprafata Totală</h4>
                                <input
                                    type="text"  // Change the input type to text
                                    value={supraface === 0 ? '' : supraface}  // Handle empty case
                                    onChange={(e) => setSupraface(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                                <h4 className="text-white text-lg">m2</h4>
                            </div>


                            <div className="flex flex-row items-center justify-start gap-2 ">
                                <h4 className="text-white text-lg">Pret</h4>
                                <input
                                    type="text"  // Change the input type to text
                                    value={price === 0 ? '' : price}  // Handle empty case
                                    onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                    className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                                />
                            </div>

                        </div>

                        <div className="bg-matteBlack flex flex-col p-4 gap-4 md:w-[500px] rounded-xl border border-solid border-white">
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
                        <div className="bg-matteBlack flex flex-col p-4 gap-4 md:w-[500px] rounded-xl border border-solid border-white">

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
                            <div className='flex flex-row items-center justify-start gap-2 md:gap-6'>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Camere</h4>
                                    <input
                                        type="number"
                                        value={rooms}
                                        min='1'
                                        onChange={(e) => setRooms(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Băi</h4>
                                    <input
                                        type="number"
                                        value={baths}
                                        min='1'
                                        onChange={(e) => setBaths(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-start gap-2 ">
                                    <h4 className="text-white text-lg">Nr. Nivele</h4>
                                    <input
                                        type="number"
                                        min='1'
                                        value={floors}
                                        onChange={(e) => setFloors(Number(e.target.value))}
                                        className="w-[50px] bg-lightGrey p-2 rounded-xl text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="bg-mainOrange w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}

            {formDisplay === 3 && (
                <form onSubmit={(e) => { handlePropertySubmit(e, 'comercial') }}>
                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
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
                            <h4 className="text-white text-lg">Adaugă Caracterstici</h4>
                            <textarea
                                value={characteristics}
                                onChange={(e) => setCharacterisitics(e.target.value)}
                                placeholder="-usa blindata"
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere Final</h4>
                            <textarea
                                value={descriptionFooter}
                                onChange={(e) => setDescriptionFooter(e.target.value)}
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
                            <h4 className="text-white text-lg">Nume Link</h4>
                            <input
                                type="text"
                                value={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
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
                        <div className="flex flex-col md:flex-row items-start justify-start gap-2">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value=""></option>
                                <option value="Exclusive">Exclusive</option>
                                <option value="Rezervat">Rezervat</option>
                                <option value="Vândut">Vândut</option>
                            </select>
                            <select
                                value={tipAnunt}
                                onChange={(e) => setTipAnunt(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Chirie">Chirie</option>
                                <option value="Vânzare">Vânzare</option>
                            </select>
                        </div>
                        {/* Destinatie  */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Destinatie</h4>
                            <select
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
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
                                type="text"  // Change the input type to text
                                value={supraface === 0 ? '' : supraface}  // Handle empty case
                                onChange={(e) => setSupraface(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                            <h4 className="text-white text-lg">m2</h4>
                        </div>


                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-white text-lg">Pret</h4>
                            <input
                                type="text"  // Change the input type to text
                                value={price === 0 ? '' : price}  // Handle empty case
                                onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-mainOrange w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}

            {formDisplay === 4 && (
                <form onSubmit={(e) => { handlePropertySubmit(e, 'terenuri') }}>
                    <div className="flex flex-col gap-4 bg-matteBlack p-4 h-fit w-full rounded-xl border border-solid border-white">
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
                            <h4 className="text-white text-lg">Adaugă Caracterstici</h4>
                            <textarea
                                value={characteristics}
                                onChange={(e) => setCharacterisitics(e.target.value)}
                                placeholder="-usa blindata"
                                className="w-full h-[100px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2">
                            <h4 className="text-white text-lg">Adaugă Descriere Final</h4>
                            <textarea
                                value={descriptionFooter}
                                onChange={(e) => setDescriptionFooter(e.target.value)}
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
                            <h4 className="text-white text-lg">Nume Link</h4>
                            <input
                                type="text"
                                value={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                                placeholder="str. Stefan cel Mare"
                                className="w-full bg-lightGrey p-2 rounded-xl text-white"
                            />
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
                        <div className="flex flex-col md:flex-row items-start justify-start gap-2">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value=""></option>
                                <option value="Exclusive">Exclusive</option>
                                <option value="Rezervat">Rezervat</option>
                                <option value="Vândut">Vândut</option>
                            </select>
                            <select
                                value={tipAnunt}
                                onChange={(e) => setTipAnunt(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Chirie">Chirie</option>
                                <option value="Vânzare">Vânzare</option>
                            </select>
                        </div>
                        {/* Destinatie  */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <h4 className="text-white text-lg">Destinatie</h4>
                            <select
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                className="w-full bg-lightGrey p-3 rounded-xl text-white"
                            >
                                <option value="Construcție">Construcție</option>
                                <option value="Agricol">Agricol</option>
                                <option value="Pomicol">Pomicol</option>
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
                                type="text"  // Change the input type to text
                                value={supraface === 0 ? '' : supraface}  // Handle empty case
                                onChange={(e) => setSupraface(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                            <h4 className="text-white text-lg">m2</h4>
                        </div>


                        <div className="flex flex-row items-center justify-start gap-2 ">
                            <h4 className="text-white text-lg">Pret</h4>
                            <input
                                type="text"  // Change the input type to text
                                value={price === 0 ? '' : price}  // Handle empty case
                                onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}  // Allow empty input
                                className="w-[200px] bg-lightGrey p-2 rounded-xl text-white"
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-mainOrange w-full p-3 rounded-xl text-white mt-4">Adaugă</button>
                </form>
            )}
        </section>
    );
};

export default Dashboard;