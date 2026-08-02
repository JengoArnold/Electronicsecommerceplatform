
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from './components/Categories/Categories';
function App() {
  return (
    <div className="App">

      <Navbar/>
    <Hero/>
    <FeaturedProducts/>
    <Categories/>
    </div>
  );
}

export default App;
