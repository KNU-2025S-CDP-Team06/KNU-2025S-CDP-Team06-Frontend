import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";
import OnBoarding from "@pages/onboarding/OnBoarding";
import Login from "@pages/login/Login";
import Mypage from "@pages/mypage/MyPage";
import { useEffect, useState } from "react";
import Main from "@pages/main/Main";
import Playground from "@pages/playground/Playground";
import Report from "@pages/report/Report";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Sales from "@pages/report/Sales/Sales";
import Menu from "@pages/report/Menu/Menu";
import Predict from "@pages/report/Predict/Predict";
import Monthly from "@pages/report/Monthly/Monthly";

const App = () => {
  const queryClient = new QueryClient();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/sales" element={<Sales />} />
            <Route path="/report/menu" element={<Menu />} />
            <Route path="/report/predict" element={<Predict />} />
            <Route path="/report/monthly" element={<Monthly />} />
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
