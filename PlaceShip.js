import {useState,useEffect} from "react"
import Typewriter from "typewriter-effect"; 

import Ships from "./components/ShipDrag"
import GameBoard from "./components/GameBoard"
import WinnerPage from "./components/Winner"
import "./placeShip.css"


import carrier from "./assets/images/carrier.svg"
import destroyer from "./assets/images/destroyer.svg"
import patrol from "./assets/images/patrol.svg"
import submarine from "./assets/images/submarine.svg"
import fireShot from "./assets/sounds/fire_shot.mp3"
import hitShot from "./assets/sounds/shot_hit.mp3"
import missShot from "./assets/sounds/shot_miss.mp3"


const initialPlayerBoard=[];
const initialIABoard=[];

for (let i = 0; i < 100; i++) {
    initialPlayerBoard.push({ hasShip: false,type:false,isShot: false,notAllowed:false});
    initialIABoard.push({ hasShip: false,type:false,isShot: false,notAllowed:false});
}
const initialShips=[
    {
     quantity:1,
     type:carrier,
     id:"carrier"
    },
    {
        quantity:1,
        type:submarine,
        id:"submarine"
    },
    {
        quantity:1,
        type:destroyer,
        id:"destroyer"
    },
    {
        quantity:1,
        type:patrol,
        id:"patrol"
    },
]

//Battle
    const initialGameStatus={
        playerAccurracy:0,
        IAAccurracy:0
    }
    const PlayerRemainingShips=["carrier","submarine","destroyer","patrol"]
    const iARemainingShips=["carrier","submarine","destroyer","patrol"]

const PlaceShip=({setBattleStart,battleStart,player,setGameStart})=>{
        
            //Drag Site
        const [elDrag,setElDrag]=useState(null)
        const [playerCells,setPlayerCells]=useState(initialPlayerBoard)
        const [IACells,setIACells]=useState(initialIABoard)
        const [dir,setDir]=useState("row")
        const [ships,setShips]=useState(initialShips)
        const [GameStatus,setGameStatus]=useState(initialGameStatus)
        const [unSunkShots,setUnSunkShots]=useState([])
        const [playerRemainingShips,setPlayerRemainingShips]=useState(PlayerRemainingShips)
        const [IARemainingShips,setIARemainingShips]=useState(iARemainingShips)
        const [winner,setWinner]=useState("")
        const [playerMessage,setPlayerMessage]=useState(`Make the first shot Admiral ${player}`)
        const [IAmessage,setIAmessage]=useState(``)
        const [turn,setTurn]=useState(0)
        const [replay,setReplay]=useState(true)
        const [hitAudio,setHitAudio]=useState(false)
        const [missAudio,setMissAudio]=useState(false)
        const [fireAudio,setfireAudio]=useState(false)
        useEffect(()=>{
            setReplay(false)
        },[turn])

        

        useEffect(()=>{
            if(!replay) setReplay(true)
        },[replay])
        useEffect(()=>{
            if(elDrag==null) return
            let count=0;
            let index=0;
            setPlayerCells(playerCells.map((el,i)=>{
                count++
                index++
               if(elDrag==="carrier"){
                   if(dir==="row"){
                        if(index===95) index=0
                        if((count>6&&count<11)||playerCells[index+3].hasShip===true||playerCells[index+2].hasShip===true||playerCells[index+1].hasShip===true){
                            if(count===10) count=0 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                   }else{
                        if(index===59) index=0
                        if((count>59)||playerCells[index+39].hasShip===true||playerCells[index+29].hasShip===true||playerCells[index+19].hasShip===true||playerCells[index+9].hasShip===true){ 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                   }
                }else if(elDrag==="submarine"){
                    if(dir==="row"){
                        if(index===96) index=0
                        if((count>7&&count<11)||playerCells[index+2].hasShip===true||playerCells[index+1].hasShip===true){
                            if(count===10) count=0 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                    }else{
                        if(index===69) index=0
                        if((count>69)||playerCells[index+29].hasShip===true||playerCells[index+19].hasShip===true||playerCells[index+9].hasShip===true){ 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                    }
                
               }else if(elDrag==="destroyer") {
                   if(dir==="row"){
                        if(index===97) index=0
                        if((count>8&&count<11)||playerCells[index+1].hasShip===true){
                            if(count===10) count=0 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                   }else{
                        if(index===79) index=0
                        if((count>79)||playerCells[index+19].hasShip===true||playerCells[index+9].hasShip===true){ 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                   }
                
               }else if(elDrag==="patrol") {
                   if(dir==="row"){
                        if(index===98) index=0
                        if((count>=10&&count<11)||playerCells[index].hasShip===true){
                            if(count===10) count=0 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }  
                   }else{
                        if(index===89) index=0
                        if((count>89)||playerCells[index+9].hasShip===true){ 
                            return {...el,notAllowed:true}
                        }else{
                            return {...el,notAllowed:false}
                        }
                   }
               }
            }))
        },[elDrag])
        
        //Battle
        const handleShot=(shot)=>{
            setfireAudio(true)
                setTurn(turn+1)
          setTimeout(()=>{

          })  
            if(IACells[shot].hasShip){
                setHitAudio(true)
                setPlayerMessage("You take a shot... BOOM")
                setIACells(IACells.map((el,index)=>(
                    index===shot ?{...el,isShot:true} : el
                )))
            }else{
                setMissAudio(true)
                setPlayerMessage("You take a shot... MISS")
                setIACells(IACells.map((el,index)=>(
                    index===shot ?{...el,notAllowed:true} : el
                )))
            }

            //IA Guess
            let IAguessShot=Math.floor(Math.random()*100)
            while(playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                IAguessShot=Math.floor(Math.random()*100);
            }
            if(unSunkShots.length===1){
                IAguessShot=[unSunkShots[0]+10,unSunkShots[0]+1,unSunkShots[0]-1,unSunkShots[0]-10][Math.floor(Math.random()*4)]
                while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                    IAguessShot=[unSunkShots[0]+10,unSunkShots[0]+1,unSunkShots[0]-1,unSunkShots[0]-10][Math.floor(Math.random()*4)]
                }
            }else if(unSunkShots.length===2){
               if( unSunkShots[0]+1===unSunkShots[1]){
                   IAguessShot=[unSunkShots[0]-1,unSunkShots[1]+1][Math.floor(Math.random()*2)]
                   while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                        IAguessShot=[unSunkShots[0]-1,unSunkShots[1]+1][Math.floor(Math.random()*2)]
                        
                    }
               }else if(unSunkShots[0]+10===unSunkShots[1]){
                   IAguessShot=[unSunkShots[0]-10,unSunkShots[1]+10][Math.floor(Math.random())*2]
                   while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                    IAguessShot=[unSunkShots[0]-10,unSunkShots[1]+10][Math.floor(Math.random())*2]
                   }
               }
            }else if(unSunkShots.length===3){
                if(unSunkShots[0]+1===unSunkShots[1]){
                    IAguessShot=[unSunkShots[2]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                    while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                        IAguessShot=[unSunkShots[2]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                    }
                }else if(unSunkShots[0]+10===unSunkShots[1]){
                    IAguessShot=[unSunkShots[2]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                    while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                        IAguessShot=[unSunkShots[2]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                    }
                }
            }else if(unSunkShots.length===4){
                if(unSunkShots[0]+1===unSunkShots[1]){
                    IAguessShot=[unSunkShots[3]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                    while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                        IAguessShot=[unSunkShots[3]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                    }
                }else if(unSunkShots[0]+10===unSunkShots[1]){
                    IAguessShot=[unSunkShots[3]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                    while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                        IAguessShot=[unSunkShots[3]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                    }
                }
            }
            if(playerCells[IAguessShot].hasShip){
                setIAmessage("Enemy take a shot... BOOM")
                setUnSunkShots([...unSunkShots,IAguessShot].sort())
                setPlayerCells(playerCells.map((el,index)=>(
                    index===IAguessShot ?{...el,isShot:true} : el
                )))
            }else{
                setIAmessage("Enemy take a shot... MISS")
                setPlayerCells(playerCells.map((el,index)=>(
                    index===IAguessShot ?{...el,notAllowed:true} : el
                )))
            }
            let IAAcCount=0
            let playerAcCount=0
            IACells.forEach(el=>{
                 el.isShot && IAAcCount++
            })
            playerCells.forEach(el=>{
                el.isShot && playerAcCount++
            })
            setGameStatus({playerAccurracy:(IAAcCount*100/(turn+1)).toFixed(2),IAAccurracy:(playerAcCount*100/(turn+1)).toFixed(2)})
        }
       useEffect(()=>{
           if(battleStart){
            let carrierCount=0;
            let submarCount=0;
            let destroyerCount=0;
            let patrolCount=0;
                playerCells.forEach((el)=>{
                    if(el.isShot){
                        if(playerRemainingShips.includes("carrier") && el.type==="carrier") carrierCount++
                        if(playerRemainingShips.includes("destroyer") && el.type==="destroyer") destroyerCount++
                        if(playerRemainingShips.includes("patrol") && el.type==="patrol") patrolCount++
                        if(playerRemainingShips.includes("submarine") &&el.type==="submarine") submarCount++
                    }
                })
                if(carrierCount===5){
                    alert("The enemy Sunk your carrier")
                    setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                        return el !=="carrier"
                    }))
                    setUnSunkShots([])
                }else if(submarCount===4){
                    alert("The enemy Sunk your submarine")
                    setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                        return el !=="submarine"
                    }))
                    setUnSunkShots([])
                }else if(destroyerCount===3){
                    alert("The enemy Sunk your destroyer")
                    setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                        return el !=="destroyer"
                    }))
                    setUnSunkShots([])
                }else if(patrolCount===2){
                    alert("The enemy Sunk your patrol") 
                    setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                        return el !=="patrol"
                    }))
                    setUnSunkShots([])
                }
                
            }   
        },[playerCells])
       useEffect(()=>{
           if(battleStart){
            let carrierCount=0;
            let submarCount=0;
            let destroyerCount=0;
            let patrolCount=0;
            IACells.forEach((el)=>{
                if(el.isShot){
                    if(IARemainingShips.includes("carrier") && el.type==="carrier") carrierCount++
                    if(IARemainingShips.includes("destroyer") && el.type==="destroyer") destroyerCount++
                    if(IARemainingShips.includes("patrol") &&el.type==="patrol") patrolCount++
                    if(IARemainingShips.includes("submarine") &&el.type==="submarine") submarCount++
                }
            })
            if(carrierCount===5) {
                alert("you Sunk their carrier")
                setIARemainingShips(IARemainingShips.filter(el=>{
                    return el !=="carrier"
                }))
            }else if(destroyerCount===3){
                alert("you Sunk their destroyer")
                setIARemainingShips(IARemainingShips.filter(el=>{
                    return el !=="destroyer"
                }))
            }else if(submarCount===4){
                alert("you Sunk their submarine")
                setIARemainingShips(IARemainingShips.filter(el=>{
                    return el !=="submarine"
                }))
            }else if(patrolCount===2){
                alert("you Sunk their patrol") 
                setIARemainingShips(IARemainingShips.filter(el=>{
                   return el !=="patrol"
                }))
            } 
        }
    },[IACells])

    useEffect(()=>{
        IARemainingShips.length===0 && setWinner(`${player}`)
        playerRemainingShips.length===0 && setWinner(`Nazis`)
    },[IARemainingShips,playerRemainingShips])
        return(
            <div>
            {!battleStart ?<div className="row text-white">
                <div className="col-6">
                    <h3 className="text-white text-center mt-5">Drag your ships to the board</h3>
                    <Ships initialShips={initialShips} IACells={IACells} setIACells={setIACells} playerCells={playerCells} setPlayerCells={setPlayerCells} setBattleStart={setBattleStart} ships={ships} carrier={carrier} submarine={submarine} destroyer={destroyer} patrol={patrol} setElDrag={setElDrag} />
                </div>
                <div className="col-6 mt-5">
                        <h3 className="text-white text-center">GameBoard <button onClick={()=>setDir(dir==="row" ? "Column" : "row")} className="btn cos-shadow btn-outline-warning text-center">Change to {dir==="row" ? "Columns": "Rows"}</button></h3>
                        <GameBoard setShips={setShips} ships={ships} dir={dir} cells={playerCells} setCells={setPlayerCells} elDrag={elDrag}  />
                        
                 </div>
            
            </div>:
            !winner ?
            <div className="battle container-fluid text-white text-shadow">
                <audio autoPlay={fireAudio} src={fireShot}></audio>
                <audio autoPlay={missAudio} src={missShot}></audio>
                <audio autoPlay={hitAudio} src={hitShot}></audio>
            
                    <h2 className="text-center cos-shadow border border-warning">
                    {replay?<Typewriter  
                        onInit={(typewriter)=> { 
                        typewriter 
                        .typeString(playerMessage)
                        
                        if(IAmessage){
                            typewriter.deleteAll() 
                            .typeString(IAmessage)
                         
                        }
                        typewriter.changeDelay(0.5) .start(); 
                        }}
                       
                    />:"Hello"}    
                    </h2>
                <div className="row">
                        <div className="col-4">
                            <h3 className="text-center">{player}`s Fleet </h3>
                            <GameBoard player={"human"} battleStart={battleStart} setShips={setShips} ships={ships} dir={dir} cells={playerCells} setCells={setPlayerCells} elDrag={elDrag}  />
                        </div>
                        <div className="col-4 text-warning">
                            <h3 className="text-center">Status</h3>
                            <h4 className="text-center">Turn: <span className="text-white">{turn}</span></h4>
                            <div className="row text-center">
                                <div className="col-6">
                                    <h3 className="text-success">{player}</h3>
                                    <h4 className="text-success">Accurracy: <span className="text-white">{GameStatus.playerAccurracy}%</span></h4>
                                    <h4 className="text-success">Remaining Ships:</h4>
                                    {playerRemainingShips.map((el,i)=>(
                                        <div key={i} className="text-white">
                                            <h5>{el}</h5>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-6">
                                    <h3 className="text-danger">Nazis</h3>
                                    <h4 className="text-danger">Accurracy: <span className="text-white">{GameStatus.IAAccurracy} %</span></h4>
                                    <h4 className="text-danger">Remaining Ships:</h4>
                                    {IARemainingShips.map((el,i)=>(
                                        <div key={i} className="text-white">
                                            <h5>{el}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-4">
                            <h3 className="text-center">Nazi`s Fleet </h3>
                            <GameBoard handleShot={handleShot} player={"IA"} battleStart={battleStart} setShips={setShips} ships={ships} dir={dir} cells={IACells} setCells={setIACells} elDrag={elDrag}  />
                        </div>
                </div>
            </div> :
            <WinnerPage winner={winner} setBattleStart={setBattleStart} setGameStart={setGameStart} />
            }
            </div>
        )
        
}



export default PlaceShip;