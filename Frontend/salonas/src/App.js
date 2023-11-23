import "./App.css";
import { Routes, Route } from "react-router-dom";
import ClientsList from "./components/ClientsList/ClientsList";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UpdateClient from "./components/UpdateClient/UpdateClient";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/update/" element={<UpdateClient />} />
        <Route path="*" element={<ClientsList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
