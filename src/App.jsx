import { useState } from "react";
import hero from "./assets/hero.png";
import "./App.css";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      <main className="min-h-screen text-white">
        <section className="hero-grid min-h-screen relative">
        <nav className="px-8 py-5">
          <h3 className="text-xl font-medium">
            Portfolio
          </h3>
        </nav>
        </section>
        
      </main>
    </>
  );
}

export default App;