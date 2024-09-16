'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const checkPassword = async (e) => {
        e.preventDefault();
    
        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
            }),
        });
    
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token);
    
            toast.success("Login successful!");
            setTimeout(() => {
                router.push('/dashboard');
            }, 500);
        } else {
            const errorData = await res.json();
            toast.error(errorData.message);
        }
    };
    

    return (
        <form onSubmit={checkPassword} className="flex flex-col py-8 gap-4 items-center justify-center text-mainOrange w-[300px] self-center">
            <h1 className="text-5xl">Login</h1>
            <input
                type="text"
                className="w-full h-[40px] rounded-lg outline-none p-2"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                className="w-full h-[40px] rounded-lg outline-none p-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-mainOrange text-white font-medium p-3 text-xl rounded-xl w-full">
                Log in
            </button>
        </form>
    );
}

export default Login;
