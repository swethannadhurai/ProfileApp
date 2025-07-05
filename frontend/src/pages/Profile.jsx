import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Profile(){
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(!token){
            navigate("/login");
            return;
        }

        axios.get('http://localhost:9000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then(res => setUser(res.data))
        .catch((err) => {
            console.error("Error fetching profile:", err);
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
        });
        
    }, [navigate, token]);

    const updateProfile = async () =>{
        try { 
            await axios.put('http://localhost:9000/api/users/profile', user, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setEditMode(false);
            alert("Profile updated successfully!!!!");
        }catch (err) {
            console.error("Update failed:", err);
            alert("Update failed");
        }
    };

    const onChange =(e) => setUser({ ...user, [e.target.name]: e.target.value});

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 border rounded shadow bg-white">
                <h2 className="text-xl font-semibold mb-4 text-center">Profile</h2>
                {['name', 'email', 'age', 'dob', 'contact'].map((field) => (
                    <input 
                    key={field}
                    name={field}
                    type={field === 'dob'? "date" : field === "age" ? "number" : "text"}
                    value={user[field] || ''}
                    onChange={onChange}
                    disabled={!editMode}
                    className={`w-full mb-3 border p-2 rounded ${!editMode ? "bg-gray-100" : ""}`}
                    />
                ))}
                <button onClick={editMode ? updateProfile : () => setEditMode(true)}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                    {editMode ? 'Save' : 'Edit'}
                </button>
            </div>    
        </div>
    );
}