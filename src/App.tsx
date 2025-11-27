import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App min-h-screen">
      <div className="flex items-center justify-center mt-5 md:mt-5">
        <img
          src="./assets/icon.png"
          alt="Memória Animal"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-2 md:mr-4"
        />
        <div className="title-gradient">Memória Animal</div>
      </div>
      <Game />
    </div>
  );
}

export default App;
