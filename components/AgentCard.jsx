'use client';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const AgentCard = ({ property }) => {
    const { name, photoUrl, _id } = property;
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

    console.log(session?.user?.type);

    return (
        <article className="w-[370px] h-[500px] bg-matteBlack flex flex-col items-center gap-10 text-mainOrange rounded-2xl">
            <img
                src={photoUrl !== '' ? `${photoUrl}` : '/agentbg.png'}
                className={`w-full h-[360px] bg-grey ${photoUrl !== '' ? `rounded-full` : 'rounded-t-2xl'}`}
            />
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <h6 className="text-base font-medium">Agent Imobiliar</h6>
                   {/* Show delete button if the user is an admin */}
            {session?.user?.type === 'admin' && (
                <button
                    onClick={handleDelete}
                    className="text-xl font-medium text-red-700 hover:underline duration-300 ease-linear"
                >
                    Delete
                </button>
            )}
            </div>
         
        </article>
    );
};

export default AgentCard;
