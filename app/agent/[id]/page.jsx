'use client';
import { useEffect, useState } from "react";
import AWS from 'aws-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EditAgentPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('agent'); // Default to agent
  const [photoUrl, setPhotoUrl] = useState(''); // Existing photo URL
  const [newPhoto, setNewPhoto] = useState(null); // For new photo uploads
  const [phoneNr, setPhonenr] = useState('');

  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch(`/api/agent/${id}`);
        const data = await res.json();
        setName(data.name);
        setPassword(data.password); // Be cautious with passwords
        setEmail(data.email);
        setType(data.type);
        setPhotoUrl(data.photoUrl);
        setPhonenr(data.phoneNr);
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgent();
  }, [id]);

  const handleImageUpload = async () => {
    if (!newPhoto) return null;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `agent-photos/${Date.now()}-${newPhoto.name}`,
      Body: newPhoto,
      ContentType: newPhoto.type,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading photo:', error);
      return null;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedPhotoUrl = photoUrl;

      // Handle image upload if a new image is selected
      if (newPhoto) {
        uploadedPhotoUrl = await handleImageUpload();
      }

      const updatedAgent = {
        name,
        password,
        email,
        type,
        photoUrl: uploadedPhotoUrl,
        phoneNr,
      };

      const res = await fetch(`/api/agent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAgent),
      });

      if (!res.ok) {
        throw new Error('Failed to update agent');
      }

      router.push(`/about`);
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/agent/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete agent');
      }
      router.push('/agents'); // Redirect after successful deletion
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-[200px] gap-2">
            <label className="text-lg text-mainOrange">Nume Agent</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            />
          </div>
          <div className="flex flex-col w-full md:w-[200px] gap-2">
            <label className="text-lg text-mainOrange">User login</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-[200px] gap-2">
            <label className="text-lg text-mainOrange">Telefon</label>
            <input
              type="text"
              value={phoneNr}
              onChange={(e) => setPhonenr(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            />
          </div>
          <div className="flex flex-col w-full md:w-[200px] gap-2">
            <label className="text-lg text-mainOrange">Tip Cont</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            >
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>
        </div>


        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-[200px] gap-2">
            <label className="text-lg text-mainOrange">Parolă</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-matteBlack text-white p-2 rounded-xl"
              required
            />
          </div>

          {/* Upload New Photo */}
          <div className="flex flex-col w-[200px] gap-2">
            <label className="text-lg text-mainOrange">Încărcați o fotografie</label>
            <input
              type="file"
              onChange={(e) => setNewPhoto(e.target.files[0])}
              className=" w-[200px] outline-none bg-matteBlack text-white p-2 rounded-xl"
            />
          </div>
          
        </div>
         {/* Existing Photo */}
         {photoUrl && (
            <div className="flex flex-col gap-2">
              <label className="text-lg text-mainOrange">Fotografie existentă</label>
              <div className="relative">
                <img src={photoUrl} alt="Agent Photo" className="w-32 h-32 object-cover rounded-md" />
                <button type="button" onClick={() => setPhotoUrl('')} className="absolute top-0 right-8">
                  <Image src='/deleteIcon.svg' alt='X' width={30} height={30} />
                </button>
              </div>
            </div>
          )}
        <div className="w-full flex flex-col gap-0.5">

          <button type="submit" className="w-full bg-mainOrange text-white p-2 rounded-xl mt-4">
            Save Changes
          </button>
          <button type="button" onClick={handleDelete} className="w-full bg-red-600 text-white p-2 rounded-xl mt-4">
            Delete Agent
          </button>
        </div>
      </form>


    </section>
  );
};

export default EditAgentPage;
