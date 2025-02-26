/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { postAPI } from "../service/apiService";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "../configure/routerPath";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const result = await postAPI('/login', { username: email, password });
            localStorage.setItem("authToken", result?.token);
            localStorage.setItem("username", result?.username);
            if (result.role === 'admin') {
                navigate(ROUTER_PATH.ADMIN_DASHBOARD)
            } else {
                navigate(ROUTER_PATH.HOME)
            }

        } catch (error: any) {
            console.error(error);
            setError(error?.response?.data?.error);
        }
        // Simulate API call


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>



                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>

                {error && <p className="text-red-500 text-sm mb-4 mt-4">{error}</p>}

                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
