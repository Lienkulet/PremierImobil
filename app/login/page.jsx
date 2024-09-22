'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === '' || email === '') {
            setTimeout(() => toast.error("Fill all fields!"), 0);
            return;
        }

        try {
            const res = await signIn('credentials', { email, password, redirect: false })

            if (res?.error == null) {
                router.push("/")
            } else {
                toast.error("Error occured while logging")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col py-8 gap-4 items-center justify-center text-mainOrange w-[300px] self-center">
            <h1 className="text-5xl">Login</h1>
            <input
                type="text"
                className="w-full h-[40px] rounded-lg outline-none p-2"
                placeholder="Username"
                value={email}
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
