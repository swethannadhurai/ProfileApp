import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App(){
  return (
    <BrowserRouter> 
      <Routes>
         <Route path="/" element={<Register />} />
         <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;