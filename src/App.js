
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
function App() {
  return (
    <div className="App">

      <Navbar/>
    <Hero/>
    <FeaturedProducts/>
    </div>
  );
}

export default App;
