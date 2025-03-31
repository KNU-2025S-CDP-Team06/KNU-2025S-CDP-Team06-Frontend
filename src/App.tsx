import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";
import OnBoarding from "@pages/onboarding/OnBoarding";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
