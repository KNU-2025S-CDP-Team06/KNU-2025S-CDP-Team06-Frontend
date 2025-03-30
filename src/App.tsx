import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "@layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>Hi</Layout>
    </BrowserRouter>
  );
};

export default App;
