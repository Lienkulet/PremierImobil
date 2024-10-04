'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import AWS from 'aws-sdk';

const EditPropertyPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { id } = params;

  const [recomandate, setrecomandate] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [propertyData, setPropertyData] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [supraface, setSupraface] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [tipAnunt, setTipAnunt] = useState('');
  const [floors, setFloors] = useState(null);
  const [floor, setFloor] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [baths, setBaths] = useState(null);
  const [balcony, setBalcony] = useState(null);
  const [parking, setParking] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [propertyCondition, setPropertyCondition] = useState('');
  const [existingImages, setExistingImages] = useState([]); // For existing photos
  const [photos, setPhotos] = useState([]); // For new uploads
  const [link, setLink] = useState('');
  const [linkName, setLinkName] = useState('');
  const [locativeFont, setLocativeFont] = useState('');

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

  // Select API endpoint based on the property type
  const getApiEndpoint = () => {
    switch (type) {
      case 'apartamente':
        return `/api/apartamente/${id}`;
      case 'case':
        return `/api/case/${id}`;
      case 'comercial':
        return `/api/comercial/${id}`;
      case 'terenuri':
        return `/api/terenuri/${id}`;
      default:
        throw new Error('Invalid property type');
    }
  };

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

  // Fetch property data on load
  useEffect(() => {
    if (id && type) {
      const fetchPropertyData = async () => {
        try {
          const res = await fetch(getApiEndpoint());
          if (!res.ok) {
            throw new Error('Nu s-au putut prelua datele despre proprietate');
          }
          const data = await res.json();
          setPropertyData(data);

          // Populate form with fetched data
          setName(data.name || '');
          setDescription(data.description || '');
          setPrice(data.price || '');
          setSupraface(data.supraface || '');
          setAddress(data.address || '');
          setFloors(data.floors || null);
          setFloor(data.floor || null);
          setRooms(data.rooms || null);
          setBaths(data.baths || null);
          setBalcony(data.balcony || null);
          setParking(data.parking || '');
          setRegion(data.region || '');
          setSector(data.sector || '');
          setHeatingType(data.heatingType || '');
          setPropertyCondition(data.propertyCondition || '');
          setExistingImages(data.images || []);
          setTipAnunt(data.tipAnunt || ''); 
          setCategory(data.category || 'Exclusive'); 
          setSelectedAgent(data.agentId._id); 
          setLink(data.link); 
          setLinkName(data.linkName); 
        } catch (err) {
          toast.error('Erroare încărcatrea datelor proprietății');
          console.error(err);
        }
      };

      fetchPropertyData();
    }
  }, [id, type]);

  // Handle Image Removal
  const handleRemoveImage = (url) => {
    setExistingImages(existingImages.filter((image) => image !== url));
  };

  const handleImageUpload = async () => {
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
            console.log("Eroare la încărcarea imaginii proprietății în Cloud S3:", error);
        }
    }

    return imageUrls;
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Actualizare');

    try {
      let uploadedPhotos = [];
      if (photos.length > 0) {
        uploadedPhotos = await handleImageUpload();
      }

      const updatedProperty = {
        name,
        description,
        price,
        supraface,
        link,
        linkName,
        address,
        floors,
        floor,
        rooms,
        baths,
        balcony,
        parking,
        region,
        sector,
        heatingType,
        propertyCondition,
        category,
        tipAnunt,
        recomandate,
        locativeFont,
        images: [...existingImages, ...uploadedPhotos], 
        agentId: selectedAgent
      };

      const res = await fetch(getApiEndpoint(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (!res.ok) {
        throw new Error('Nu s-a putut actualiza proprietatea');
      }

      if (res.ok) {
        toast.success('Anunt Actualizat cu Success!', { id: toastId });
        router.push(`/imobil/${id}?type=${type}`);
      }
      
      // router.push(`/property/${id}`);
    } catch (err) {
      toast.error('Eroare la actualizarea proprietății', { id: toastId });
      console.error(err);
    }
  };

  if (!propertyData) {
    return <div>Loading...</div>; // You can replace this with a loader
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={e =>handleFormSubmit(e)} className="space-y-4">
        {/* Name Input */}
        <div className="flex flex-col">
          <label className="text-lg text-mainOrange">Titlu</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none bg-matteBlack text-white p-2 rounded-xl"
            required
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col">
          <label className="text-lg text-mainOrange">Descriere</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none bg-matteBlack text-white p-2 rounded-xl min-h-[200px]"
            required
          />
        </div>
        <div className='flex flex-wrap items-end justify-start gap-4'>
          {/* Address Input */}
          <div className="flex flex-col w-full max-w-[400px]">
            <label className="text-lg text-mainOrange">Adresa</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2.5 rounded-xl"
              required
            />
          </div>
          <div className='flex flex-wrap items-center justify-start'>
            <h4 className="text-mainOrange text-lg">Regiune</h4>
            <select
              value={region}
              onChange={(e) => { setRegion(e.target.value); setSector(''); }}
              className="w-full bg-matteBlack p-3 rounded-xl text-white"
            >
              <option value="Chişinău">Chişinău</option>
              <option value="Suburbii">Suburbii</option>
            </select>
          </div>

          <div className='flex flex-wrap items-start justify-start'>
            <h4 className="text-mainOrange text-lg">Sector/Suburbie</h4>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-matteBlack p-3 rounded-xl text-white"
            >
              <option value="">Selectează Sector/Suburbie</option>
              {sectorsByRegion[region].map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-fit bg-matteBlack p-3 rounded-xl text-white"
          >
            <option value=""></option>
            <option value="Exclusive">Exclusive</option>
            <option value="Rezervat">Rezervat</option>
            <option value="Vândut">Vândut</option>
          </select>
          <select
            value={tipAnunt}
            onChange={(e) => setTipAnunt(e.target.value)}
            className="w-fit bg-matteBlack p-3 rounded-xl text-white"
          >
            <option value="Chirie">Chirie</option>
            <option value="Vânzare">Vânzare</option>
          </select>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          {/* Price Input */}
          <div className="flex flex-col w-full md:w-[200px]">
            <label className="text-lg text-mainOrange">Preţ (€)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            />
          </div>

          {/* Supraface Input */}
          <div className="flex flex-col w-full md:w-[200px]">
            <label className="text-lg text-mainOrange">Suprafață (m²)</label>
            <input
              type="number"
              value={supraface}
              onChange={(e) => setSupraface(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            />
          </div>

          <div className="flex flex-col w-full md:w-[200px]">
            <h4 className="text-mainOrange text-lg">Nume Link</h4>
            <input
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="str. Stefan cel Mare"
              className="w-full outline-none bg-matteBlack p-2 rounded-xl text-white"
            />
          </div>
          <div className="flex flex-col w-full md:w-[200px]">
            <h4 className="text-mainOrange text-lg w-full md:w-[200px]">Link</h4>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter Link"
              className="w-full p-2 outline-none rounded-xl bg-matteBlack text-white"
            />
          </div>
          <div className="flex flex-col w-full md:w-[200px]">
            <h4 className="text-mainOrange text-lg">Recomandate</h4>
            <select
              value={recomandate}
              onChange={(e) => { setrecomandate(e.target.value === 'true' ? true : false); console.log(recomandate) }}
              className="w-full h-fit bg-matteBlack p-2.5 rounded-xl text-white"
            >
              <option key='true' value='true'>Da</option>
              <option key='false' value='false'>Nu</option>
            </select>
          </div>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="w-full md:w-[200px] h-fit bg-matteBlack p-2.5 rounded-xl text-white"
          >
            <option value="">Alege Agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>{agent.name}</option>
            ))}
          </select>

        </div>


        {/* E20 sau VR14 */}
        {/* Additional Fields for Apartments and Houses */}
        {type === 'apartamente' && (
          <>
            <div className='flex flex-wrap items-end justify-start gap-4'>
            <div className="flex flex-col w-full md:w-[200px]">
                <h4 className="w-full md:w-fit text-mainOrange text-lg">Stare Imobil</h4>
                <select
                  value={propertyCondition}
                  onChange={(e) => setPropertyCondition(e.target.value)}
                  className="w-full md:w-full bg-matteBlack p-3 rounded-xl text-white"
                >
                  <option value="Reparație euro">Reparație euro</option>
                  <option value="Reparație mediu">Reparație mediu</option>
                  <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
                </select>
              </div>
              <div className="flex flex-col w-full md:w-[200px]">
                <h4 className="text-mainOrange text-lg">Font Locativ</h4>
                <select
                  value={locativeFont}
                  onChange={(e) => setLocativeFont(e.target.value)}
                  className="w-full md:w-full bg-matteBlack p-3 rounded-xl text-white"
                >
                  <option value="Bloc Nou">Bloc Nou</option>
                  <option value="Bloc Secundar">Bloc Secundar</option>
                </select>
              </div>
              <div className="flex flex-col items-start justify-start">
                <h4 className="text-mainOrange text-lg">Încălzire</h4>
                <select
                  value={heatingType}
                  onChange={(e) => { setHeatingType(e.target.value); }}
                  className="w-full md:w-full bg-matteBlack p-2.5 rounded-xl text-white"
                >
                  <option value="Autonomă">Autonomă</option>
                  <option value="Centralizată">Centralizată</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-mainOrange text-lg">Parcare</label>
                <select
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="outline-none bg-matteBlack text-white p-2.5 rounded-xl"
                >
                  <option value=""></option>
                  <option value="Subterana">Subterana</option>
                  <option value="Curte">Curte</option>
                  <option value="Garaj">Garaj</option>
                </select>
              </div>
              <div className="flex flex-col w-full md:w-[200px]">
                <label className="text-lg text-mainOrange">Nr. camere</label>
                <select className="w-full md:w-fit bg-matteBlack p-2 rounded-xl text-white"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}>
                  <option value="1">1 Cameră</option>
                  <option value="1+living">1 Cameră+Living</option>
                  <option value="2">2 Camere</option>
                  <option value="2+living">2 Camere+Living</option>
                  <option value="3">3 Camere</option>
                  <option value="3+living">3 Camere+Living</option>
                  <option value="4">4 Camere</option>
                  <option value="4+living">4 Camere+Living</option>
                  <option value="5+">5+ Camere</option>
                </select>
              </div>
            </div>
            <div className='flex flex-wrap gap-4'>
              <div className="flex flex-col">
                <label className="text-lg text-mainOrange">Etaj</label>
                <input
                  type="number"
                  value={floor}
                  min={-1}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-[100px] outline-none bg-matteBlack text-white p-2 rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg text-mainOrange">Etaje</label>
                <input
                  type="number"
                  value={floors}
                  min={1}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-[100px] outline-none bg-matteBlack text-white p-2 rounded-xl"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg text-mainOrange">Băi</label>
                <input
                  type="number"
                  value={baths}
                  min={0}
                  onChange={(e) => setBaths(e.target.value)}
                  className="w-[100px] outline-none bg-matteBlack text-white p-2 rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg text-mainOrange">Balcoane</label>
                <input
                  type="number"
                  value={balcony}
                  min={0}
                  onChange={(e) => setBalcony(e.target.value)}
                  className="w-[100px] outline-none bg-matteBlack text-white p-2 rounded-xl"
                />
              </div>
            </div>
          </>
        )}

{type === 'case' && (
          <>
            <div className='flex flex-wrap items-end justify-start gap-4'>
              <div className="flex flex-col">
                <h4 className="w-fit text-mainOrange text-lg">Stare Imobil</h4>
                <select
                  value={propertyCondition}
                  onChange={(e) => setPropertyCondition(e.target.value)}
                  className="w-full bg-matteBlack p-3 rounded-xl text-white"
                >
                  <option value="Reparație euro">Reparație euro</option>
                  <option value="Reparație mediu">Reparație mediu</option>
                  <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
                </select>
              </div>
              <div className="flex flex-col">
                <h4 className="text-mainOrange text-lg">Font Locativ</h4>
                <select
                  value={locativeFont}
                  onChange={(e) => setLocativeFont(e.target.value)}
                  className="w-full bg-matteBlack p-3 rounded-xl text-white"
                >
                  <option value="Bloc Nou">Reparație euro</option>
                  <option value="Bloc Secundar">Reparație mediu</option>
                  <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
                </select>
              </div>
              <div className="flex flex-col items-start justify-start">
                <h4 className="text-mainOrange text-lg">Nr. Camere</h4>
                <input
                  type="number"
                  value={rooms}
                  min='1'
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-[100px] bg-matteBlack p-2.5 rounded-xl text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg text-mainOrange">Etaje</label>
                <input
                  type="number"
                  value={floors}
                  min={-1}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-[100px] outline-none bg-matteBlack text-white p-2.5 rounded-xl"
                />
            </div>
            </div>
            
          </>
        )}
        

        {type === 'comercial' && (
          <div className='flex flex-wrap gap-4'>
            <div className="flex flex-col">
              <label className="text-lg text-mainOrange">Destinație</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              >
                <option value="Comercial">Comercial</option>
                <option value="Birouri">Birouri</option>
                <option value="Depozit">Depozit/Producție</option>
              </select>
            </div>
            <div className="flex flex-col">
                <h4 className="w-fit text-mainOrange text-lg">Stare Imobil</h4>
                <select
                  value={propertyCondition}
                  onChange={(e) => setPropertyCondition(e.target.value)}
                  className="w-full bg-matteBlack p-3 rounded-xl text-white"
                >
                  <option value="Reparație euro">Reparație euro</option>
                  <option value="Reparație mediu">Reparație mediu</option>
                  <option value="Fără reparație/Variantă albă">Fără reparație/Variantă albă</option>
                </select>
              </div>
          </div>
        
        )}
        {type === 'terenuri' && (
          <div className='flex flex-wrap gap-4'>
            <div className="flex flex-col">
              <label className="text-lg text-mainOrange">Destinație</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              >
                <option value="Construcție">Construcție</option>
                <option value="Agricol">Agricol</option>
                <option value="Pomicol">Pomicol</option>
              </select>
            </div>
          </div>

        )}
        {/* Display Existing Photos with Remove Option */}
        <div className="flex flex-col">
          <label className="text-lg text-mainOrange">Fotografii existente</label>
          <div className="flex flex-wrap gap-4">
            {existingImages.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`property-photo-${index}`} className="w-32 h-32 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-0 right-0"
                >
                  <Image src='/deleteIcon.svg' alt='X' width={30} height={30} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload New Photos */}
        <div className="flex flex-col">
          <label className="text-lg text-mainOrange">Încărcați fotografii noi</label>
          <input
            type="file"
            multiple
            onChange={(e) => setPhotos([...e.target.files])}
            className="outline-none bg-matteBlack text-white p-2 rounded-xl"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-mainOrange text-white px-4 py-2 rounded-xl"
        >
          Actualizați anunț
        </button>
      </form>
    </div>
  );
};

export default EditPropertyPage;
