import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";
import OnBoarding from "@pages/onboarding/OnBoarding";
import Login from "@pages/login/Login";
import Mypage from "@pages/mypage/MyPage";
import { useEffect, useState } from "react";
import Main from "@pages/main/Main";
import Playground from "@pages/playground/Playground";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const MainRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated ? <Main /> : <OnBoarding />;
};

export default App;
