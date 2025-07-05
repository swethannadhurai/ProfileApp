import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login(){
    const [input, setInput] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value});
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{ 
            const res = await axios.post('http://localhost:9000/api/users/login', input);
            localStorage.setItem('token', res.data.token);
            navigate('/profile');
        }catch (err){
            console.error("Login failed:", err);
            alert(err.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-3">
                {['email', 'password'].map((field) =>(
                    <input 
                    key={field}
                    name={field}
                    type={field === 'password'? 'password': 'text'}
                    value={input[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="w-full border p-2 rounded"
                    required
                    />
                ))}
                <button  type="submit" className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700">Login</button>
            </form>
            <p className="text-center text-sm mt-4">
                Dont't have an account?{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                Register here</Link>
            </p>
        </div>
    );
}