'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditPropertyPage = ({params}) => {
  const router = useRouter();
  const { id } = params;

  const [propertyData, setPropertyData] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [supraface, setSupraface] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]); // for new uploads

  // Fetch property data on load
  useEffect(() => {
    if (id) {
      const fetchPropertyData = async () => {
        try {
          const res = await fetch(`/api/apartamente/${id}`);
          const data = await res.json();
          setPropertyData(data);
          // Populate form with fetched data
          setName(data.name || '');
          setDescription(data.description || '');
          setPrice(data.price || '');
          setSupraface(data.supraface || '');
          setAddress(data.address || '');
        } catch (err) {
          toast.error('Failed to load property data');
          console.error(err);
        }
      };

      fetchPropertyData();
    }
  }, [id]);

  const handleImageUpload = async () => {
    const uploadedImages = [];
    for (let i = 0; i < photos.length; i++) {
      const formData = new FormData();
      formData.append('file', photos[i]);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        uploadedImages.push(data.secure_url);
      } catch (err) {
        console.error('Image upload error:', err);
      }
    }
    return uploadedImages;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Updating property...');

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
        address,
        images: [...propertyData.images, ...uploadedPhotos], // merge old and new photos
      };

      const res = await fetch(`/api/apartamente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (!res.ok) {
        throw new Error('Failed to update property');
      }

      toast.success('Property updated successfully!', { id: toastId });
    //   router.push(`/property/${id}`);
    } catch (err) {
      toast.error('Error updating property', { id: toastId });
      console.error(err);
    }
  };

  if (!propertyData) {
    return <div>Loading...</div>; // You can replace this with a loader
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Property {id}</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Price (€)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Supraface (m²)</label>
          <input
            type="number"
            value={supraface}
            onChange={(e) => setSupraface(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Upload New Photos</label>
          <input
            type="file"
            multiple
            onChange={(e) => setPhotos([...e.target.files])}
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-mainOrange text-white px-4 py-2 rounded"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default EditPropertyPage;
