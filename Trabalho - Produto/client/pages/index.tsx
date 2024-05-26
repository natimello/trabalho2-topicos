import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/navBar";
import Registrar from "@/pages/registrar";
import Listar from "@/pages/listar";
import Update from "@/pages/update";

export default function Home() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/listar" element={<Listar />} />
          <Route path="/atualizar/:itemId" element={<Update />} />
        </Routes>
      </main>
    </Router>
  );
}
