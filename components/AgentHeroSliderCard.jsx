'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const AgentsHeroSliderCard = ({ property }) => {
    const { name, photoUrl, phoneNr, _id } = property;
    const { data: session } = useSession(); // Get session data

    // Function to handle delete action
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this property?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/agent/${_id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete the property');
            }

            toast.success('Property deleted successfully');
            // Add any necessary logic after successful deletion, like refreshing the page
        } catch (error) {
            console.error("Error deleting property:", error);
            toast.error('Failed to delete the property');
        }
    };

    return (
        <Link href={`/agentproprietati/${_id}`}
        className={`w-[300px] ${session?.user?.type === 'admin' ? 'h-[450px]': 'h-[400px]'}  bg-matteBlack flex flex-col items-center gap-10 text-mainOrange rounded-2xl `}>
            <img
                src={photoUrl !== '' ? `${photoUrl}` : '/agentbg.png'}
                className={`w-full h-[280px] bg-grey ${photoUrl !== '' ? `rounded-full` : 'rounded-t-2xl'}`}
            />
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <h6 className="text-base font-medium">Agent Imobiliar</h6>
                   {/* Show delete button if the user is an admin */}
            {session?.user?.type === 'admin' && (
               <div className='flex flex-row gap-3'>
                 <Link
                    href={`/agent/${_id}`}
                    className="text-xl font-medium text-orange-700 hover:underline duration-300 ease-linear"
                >
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="text-xl font-medium text-red-700 hover:underline duration-300 ease-linear"
                >
                    Delete
                </button>
                </div>
            )}
            </div>
         
        </Link>
    );
};

export default AgentsHeroSliderCard;
