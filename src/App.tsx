import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";
import OnBoarding from "@pages/onboarding/OnBoarding";
import Login from "@pages/login/Login";
import Mypage from "@pages/mypage/MyPage";
const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
