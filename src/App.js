import {useState} from "react"
import HomePage from "./HomePage"
import GameController from "./GameController"
import logo from "./assets/images/bs_logo.png"
import music from "./assets/sounds/music.mp3"
import backgroundMusic from "./assets/sounds/background_sound.mp3"

function App() {
  const [player,setPlayer]=useState("")
  const [gameStart,setGameStart]=useState(false)
  const [battleStart,setBattleStart]=useState(false)
  return (
        <div className="bg-dark" >
          {player&&!battleStart&&<audio autoPlay src={music}></audio>}
          {battleStart&&<audio autoPlay onEnded={(e)=>e.target.play()} src={backgroundMusic}></audio>}
          <header className="container-fluid bg-dark text-center text-white p-3">
              <img className={gameStart?`smallLogo`:"bigLogo"} src={logo} alt=""/>
          </header>
          {!gameStart ?
          <HomePage setPlayer={setPlayer} setGameStart={setGameStart} player={player} />:
          <GameController  setGameStart={setGameStart} setBattleStart={setBattleStart} player={player} battleStart={battleStart} setBattleStart={setBattleStart} />}
          </div>
        
  );
}

export default App;
