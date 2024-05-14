import { Route, Routes } from "react-router-dom";
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Signup from "./pages/signup";
import { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { userState } from "./atoms/user";
import MyPage from "./pages/mypage";

function App() {
  const [user, setUserState] = useRecoilState(userState);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={(user.isAuthenticated) ? <Main /> : <Login />} />
        <Route path="/login" element={(user.isAuthenticated) ? <Main /> : <Login />} />
        <Route path="/signup" element={(user.isAuthenticated) ? <Main /> : <Signup />} />
        <Route path="/mypage" element={(user.isAuthenticated) ? <MyPage /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
