import { Route, Routes } from "react-router-dom";
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Signup from "./pages/signup";
import { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { userState } from "./atoms/user";

function App() {
  const [user, setUserState] = useRecoilState(userState);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={ (user.isAuthenticated) ? <Main /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
