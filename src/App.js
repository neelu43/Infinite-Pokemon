import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const randomId = () => {
    return Math.floor(Math.random() * 500 + 1);
  };

  const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = await response.json();

    setItems(
      items.concat({image:data.sprites.other.dream_world.front_default, name:data.name})
    );
  };

  function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
      observer.observe(ref.current)
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }


    if(useOnScreen(ref)){
      getPokemon(randomId())
    }
  return (
    <div className="App">
      <header className="heading">Infinite Pokemons</header>
      <div className="main">
        {items.map((p) => (
          <div className="card">
            <img src={p.image} className="cardImage"/>
            {p.name}
          </div>)
        )}
      </div>
      <div ref={ref}></div>
      <br />
      <br />
      <br />

    </div>
  );
}

export default App;
