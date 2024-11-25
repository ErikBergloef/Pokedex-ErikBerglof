import { useState } from "react";
import "./App.css";
import PokemonApplication from "./components/PokemonApplication";

function App() {
  let [startApp, setStartApp] = useState(false);

  return (
    <>
      <div className="App-container">
        <button
          className="StartButton"
          onClick={() => {
            setStartApp(!startApp);
          }}
        >
          {startApp ? "Close Pokedex" : "Open Pokedex"}
        </button>
        {startApp && <PokemonApplication />}
      </div>
    </>
  );
}

export default App;
