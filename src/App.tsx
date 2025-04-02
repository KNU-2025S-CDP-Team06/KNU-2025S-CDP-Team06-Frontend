import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";
import OnBoarding from "@pages/onboarding/OnBoarding";
import Login from "@pages/login/Login";
import Mypage from "@pages/mypage/MyPage";
import { useEffect, useState } from "react";
import Main from "@pages/main/Main";
import Nav from "@components/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <Nav />
      </Layout>
    </BrowserRouter>
  );
};

const MainRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated ? <Main></Main> : <OnBoarding />;
};

export default App;
