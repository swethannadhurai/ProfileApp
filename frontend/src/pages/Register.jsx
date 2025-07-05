import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        dob: '',
        contact: '',
    });
    const navigate = useNavigate();

    const updateField = (e) => setData({
        ...data, [e.target.name]: e.target.value
    });

    const handleRegister = async (e)=> {
        e.preventDefault();
        try{ 
             const res = await axios.post('http://localhost:9000/api/users/register', data);
             localStorage.setItem('token', res.data.token);
             alert("Registration Successfull!!!")
             navigate('/login');
        } catch (err){
            console.error("Registration failed:", err);
            alert(err.response?.data.message || "Something went wrong.");
        }
    };

    return (
     <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
     <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
     <form onSubmit={handleRegister} className="space-y-3">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={updateField}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={updateField}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={updateField}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={data.age}
          onChange={updateField}
          className="w-full border p-2 rounded"
        />
        <input
          name="dob"
          type="date"
          placeholder="Date of Birth"
          value={data.dob}
          onChange={updateField}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="contact"
          type="text"
          placeholder="Contact Number"
          value={data.contact}
          onChange={updateField}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
        >
          Register
        </button>
    </form>
    <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
        Login here</Link> 
    </p>
    </div>
    );
}