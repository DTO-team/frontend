import './App.css';
import { Counter } from './features/counter/Counter';
import Pokemon from './features/pokemon/Pokemon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>DTO team</h1>
       <Counter/>
       <Pokemon/>
      </header>
    </div>
  );
}

export default App;
