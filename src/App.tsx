import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App min-h-screen">
      <div className="flex items-center justify-center">
        <img
          src="./assets/icon.png"
          alt="Memória Animal"
          className="w-16 h-16 rounded-full mr-4 mt-5"
        />
        <div className="title-gradient">Memória Animal</div>
      </div>
      <Game />
    </div>
  );
}

export default App;
