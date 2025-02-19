import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/actionCreators/authActions";
import { Link } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ contact: "", password: "" });
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
        
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
          
            <nav className="bg-blue-600 w-full p-4 text-white flex justify-between items-center fixed top-0 left-0">
                <h1 className="text-2xl font-bold">Vaccination System</h1>
                <div>
                    <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200">
                        Register
                    </Link>
                </div>
            </nav>

            <div className="flex flex-grow justify-center items-center mt-8">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                    
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact</label>
                            <input
                                type="text"
                                name="contact"
                                value={form.contact}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your contact"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-gray-600 text-center mt-4">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
