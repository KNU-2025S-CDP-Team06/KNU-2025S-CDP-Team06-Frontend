import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";
import Onboarding from "./pages/onboarding/Onboarding";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
