import {useEffect,useState} from "react"
import Typewriter from "typewriter-effect"; 

import WinnerPage from "./Winner"
import GameBoard from "./GameBoard"

import nazi from "../assets/images/nazi.jfif"
import unitedKingdom from "../assets/images/united.jfif" 
import hitShot from "../assets/sounds/shot_hit.mp3"
import missShot from "../assets/sounds/shot_miss.mp3"

const PlayerRemainingShips=["carrier","submarine","destroyer","patrol"]
const iARemainingShips=["carrier","submarine","destroyer","patrol"]


const BattleStart=({player,IACells,setIACells,playerCells,setPlayerCells,battleStart,setShips,ships,dir,elDrag,setBattleStart,setGameStart,carrier,destroyer,patrol,submarine})=>{
    const [IAAccurracy,setIAAccurracy]=useState(0)
    const [playerAccurracy,setPlayerAccurracy]=useState(0)
    const [unSunkShots,setUnSunkShots]=useState([])
    const [actualType,setActualType]=useState("")
    const [playerRemainingShips,setPlayerRemainingShips]=useState(PlayerRemainingShips)
    const [IARemainingShips,setIARemainingShips]=useState(iARemainingShips)
    const [winner,setWinner]=useState("")
    const [playerMessage,setPlayerMessage]=useState(`Make the first shot Admiral ${player}`)
    const [IAmessage,setIAmessage]=useState(`Enemy is waiting for your shot`)
    const [turn,setTurn]=useState(0)
    const [clickAllow,setClickAllow]=useState(true)
    const [playerReplay,setPlayerReplay]=useState(true)
    const [IAreplay,setIAreplay]=useState(true)
    const [hitAudio,setHitAudio]=useState(false)
    const [missAudio,setMissAudio]=useState(false)
    const [hideStatus,setHideStatus]=useState(false)

    useEffect(()=>{
        setPlayerReplay(false)
        setTimeout(()=>{
            setIAreplay(false)
        },4000)
        
    },[turn])
    useEffect(()=>{
        if(!clickAllow){
            setTimeout(()=>{
                setClickAllow(true)
            },7000)
        }        
    },[clickAllow])
    useEffect(()=>{
        if(!playerReplay) setPlayerReplay(true)
        if(!IAreplay) setIAreplay(true)
    },[playerReplay,IAreplay])

    const handleShot=(shot)=>{
        if(!clickAllow) return
        setClickAllow(false)
    setTurn(turn+1)
    if(IACells[shot].hasShip){
        setHitAudio(true)
        setPlayerMessage("You take a shot... BOOM!😎")
        setIACells(IACells.map((el,index)=>(
            index===shot ?{...el,isShot:true} : el
        )))
    }else{ 
        setMissAudio(true)
        setPlayerMessage("You take a shot... MISS🤕")
        setIACells(IACells.map((el,index)=>(
            index===shot ?{...el,notAllowed:true} : el
        )))
    }

    //IA Guess
    setTimeout(()=>{
        let IAguessShot=Math.floor(Math.random()*100)
        while(playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
            IAguessShot=Math.floor(Math.random()*100);
        }
        if(unSunkShots.length===1){
            IAguessShot=[unSunkShots[0]+10,unSunkShots[0]+1,unSunkShots[0]-1,unSunkShots[0]-10][Math.floor(Math.random()*4)]
            while(!playerCells[IAguessShot]||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                IAguessShot=[unSunkShots[0]+10,unSunkShots[0]+1,unSunkShots[0]-1,unSunkShots[0]-10][Math.floor(Math.random()*4)]
            }
        }else if(unSunkShots.length===2){
           if( unSunkShots[0]+1===unSunkShots[1]){
               IAguessShot=[unSunkShots[0]-1,unSunkShots[1]+1][Math.floor(Math.random()*2)]
               while(!playerCells[IAguessShot]||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                    IAguessShot=[unSunkShots[0]-1,unSunkShots[1]+1][Math.floor(Math.random()*2)]
                    
                }
           }else if(unSunkShots[0]+10===unSunkShots[1]){
               IAguessShot=[unSunkShots[0]-10,unSunkShots[1]+10][Math.floor(Math.random()*2)]
               while(!playerCells[IAguessShot]||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                IAguessShot=[unSunkShots[0]-10,unSunkShots[1]+10][Math.floor(Math.random()*2)]
               }
           }
        }else if(unSunkShots.length===3){
            if(unSunkShots[0]+1===unSunkShots[1]){
                IAguessShot=[unSunkShots[2]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                while(!playerCells[IAguessShot]||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                    IAguessShot=[unSunkShots[2]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                }
            }else if(unSunkShots[0]+10===unSunkShots[1]){
                IAguessShot=[unSunkShots[2]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                while(!playerCells[IAguessShot]||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                    IAguessShot=[unSunkShots[2]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                }
            }
        }else if(unSunkShots.length===4){
            if(unSunkShots[0]+1===unSunkShots[1]){
                IAguessShot=[unSunkShots[3]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                while(!playerCells[IAguessShot]||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot){
                    IAguessShot=[unSunkShots[3]+1,unSunkShots[0]-1][Math.floor(Math.random()*2)]
                }
            }else if(unSunkShots[0]+10===unSunkShots[1]){
                IAguessShot=[unSunkShots[3]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                while(!playerCells[IAguessShot]||playerCells[IAguessShot].notAllowed||playerCells[IAguessShot].isShot||(playerCells[IAguessShot].type&&playerCells[IAguessShot].type!==actualType)){
                    IAguessShot=[unSunkShots[3]+10,unSunkShots[0]-10][Math.floor(Math.random()*2)]
                }
            }
        }
        if(playerCells[IAguessShot].hasShip){
            setHitAudio(true)
            if(unSunkShots.length===0) setActualType(playerCells[IAguessShot].type)
            setIAmessage("Enemy take a shot... BOOM!🤕")
            setUnSunkShots([...unSunkShots,IAguessShot].sort())
            setPlayerCells(playerCells.map((el,index)=>(
                index===IAguessShot ?{...el,isShot:true} : el
            )))
        }else{
            setMissAudio(true)  
            setIAmessage("Enemy take a shot... MISS😎")
            setPlayerCells(playerCells.map((el,index)=>(
                index===IAguessShot ?{...el,notAllowed:true} : el
            )))
        }
    },4000)
    
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
            setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                return el !=="carrier"
            }))
            setPlayerCells(playerCells.map(el=>(
                el.type==="carrier" ?{...el,isSunk:true} : el
            )))
            setIAmessage("Enemy take a shot... 😱They sunk your carrier")
            setUnSunkShots([])
        }else if(submarCount===4){
            setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                return el !=="submarine"
            }))
            setPlayerCells(playerCells.map(el=>(
                el.type==="submarine" ?{...el,isSunk:true} : el
            )))
            setIAmessage("Enemy take a shot... 😱They sunk your submarine")
            setUnSunkShots([])
        }else if(destroyerCount===3){
            setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                return el !=="destroyer"
            }))  
            setIAmessage("Enemy take a shot... 😱They sunk your destroyer")
            setPlayerCells(playerCells.map(el=>(
                el.type==="destroyer" ?{...el,isSunk:true} : el
            )))
            setUnSunkShots([])
        }else if(patrolCount===2){
            setPlayerRemainingShips(playerRemainingShips.filter(el=>{
                return el !=="patrol"
            }))
            setIAmessage("Enemy take a shot... 😱They sunk your patrol")
            setPlayerCells(playerCells.map(el=>(
                el.type==="patrol" ?{...el,isSunk:true} : el
            )))
            setUnSunkShots([])
        }
        if(turn!==0){
            let IAAcCount=0
            playerCells.forEach(el=>{
                el.isShot && IAAcCount++
            })
            
            setIAAccurracy((IAAcCount*100/(turn)).toFixed(0))

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
        setIARemainingShips(IARemainingShips.filter(el=>{
            return el !=="carrier"
        })) 
        setPlayerMessage("You take a shot... 😂We sunk the enemy carrier!")
        setIACells(IACells.map(el=>(
            el.type==="carrier" ?{...el,isSunk:true} : el
        )))
    }else if(destroyerCount===3){
        setIARemainingShips(IARemainingShips.filter(el=>{
            return el !=="destroyer"
        }))
        setPlayerMessage("You take a shot... 😂We sunk the enemy destroyer!")
        setIACells(IACells.map(el=>(
            el.type==="destroyer" ?{...el,isSunk:true} : el
        )))
    }else if(submarCount===4){
        setIARemainingShips(IARemainingShips.filter(el=>{
            return el !=="submarine"
        }))
        setPlayerMessage("You take a shot... 😂We sunk the enemy submarine!")
        setIACells(IACells.map(el=>(
            el.type==="submarine" ?{...el,isSunk:true} : el
        )))
    }else if(patrolCount===2){
        setIARemainingShips(IARemainingShips.filter(el=>{
           return el !=="patrol"
        }))
        setPlayerMessage("You take a shot... 😂We sunk the enemy patrol!")
        setIACells(IACells.map(el=>(
            el.type==="patrol" ?{...el,isSunk:true} : el
        )))
    } 
    if(turn!==0){
            let playerAcCount=0
            IACells.forEach(el=>{
                el.isShot && playerAcCount++
            })
            setPlayerAccurracy((playerAcCount*100/(turn)).toFixed(0))
        }
    }
},[IACells])

useEffect(()=>{
IARemainingShips.length===0 && setWinner(`${player}`)
playerRemainingShips.length===0 && setWinner(`Nazis`)
},[IARemainingShips,playerRemainingShips])

useEffect(()=>{
    hitAudio&&
    setTimeout(()=>{
        setHitAudio(false)
    },3000) 
    missAudio&&
    setTimeout(()=>{
        setMissAudio(false)
    },3000) 
},[hitAudio,missAudio])
    return(
        
        
     <div>
         {!winner?
         <div className="battle container-fluid text-white text-shadow">
            {missAudio&& <audio  autoPlay src={missShot}></audio>}
            {hitAudio &&<audio  autoPlay src={hitShot}></audio>} 
        <div className="row">
                 <div className="col-lg-4 mb-2">
                     <h3 className="text-center">{player}`s Fleet  <img style={{width:`2em`}} className="cos-shadow" src={unitedKingdom} alt="a allied flag"/></h3>
                     <h5 className="msg text-warning text-center">{playerReplay?<Typewriter  
                        onInit={(typewriter)=> { 
                        typewriter 
                        .changeDelay(100)
                        .typeString(playerMessage)
                        .start(); 
                        }}
                         />:"Hello"}
                     </h5>
                     <GameBoard player={"human"} battleStart={battleStart} setShips={setShips} ships={ships} dir={dir} cells={playerCells} setCells={setPlayerCells} elDrag={elDrag}  />
                 </div>
                 <div className="col-lg-4  text-warning">
                     <h3 className="text-center mt-5">Status</h3>
                     <h4 className="text-center">Turn: <span className="text-white">{turn}</span></h4>
                     <div className="text-center"><button onClick={()=>setHideStatus(!hideStatus)} className="col-4 mb-3 cos-shadow btn btn-outline-warning">{!hideStatus ? "Show" :"Hide"} Game status</button></div>
                     <div style={{display:`${hideStatus ? "none":"flex"}`,marginLeft:"35px"}} className="statisc row">
                         <div className="col-6">
                             <h3 className="text-success text-center">{player} <img style={{width:`1em`}} className="cos-shadow" src={unitedKingdom} alt="a allied flag"/></h3>
                             <h4 className="text-success text-center">Accurracy: <span className="text-white">{playerAccurracy}%</span></h4>
                             <h5 className="text-success text-center">Remaining Ships:</h5>
                             {playerRemainingShips.map((el,i)=>(
                                 <div key={i} style={{marginLeft:"20px"}} className="text-white container">
                                      <img style={{height:"1.5rem"}}  className="cos-shadow mt-2" src={el==="carrier"?carrier:el==="destroyer"?destroyer:el==="patrol"?patrol:el==="submarine"&&submarine} alt="a carrier"/>
                                     
                                 </div>
                             ))}
                         </div>
                         <div className="col-6">
                             <h3 className="text-danger">Nazis  <img style={{width:`1em`}} className="cos-shadow" src={nazi} alt="a nazi flag"/></h3>
                             <h4 className="text-danger w-100">Accurracy: <span className="text-white">{IAAccurracy} %</span></h4>
                             <h5 className="text-danger">Remaining Ships:</h5>
                             {IARemainingShips.map((el,i)=>(
                                 <div key={i} className="text-white">
                                     <div className="container-fluid"><img style={{height:"1.5rem"}}  className="cos-shadow mt-2" src={el==="carrier"?carrier:el==="destroyer"?destroyer:el==="patrol"?patrol:el==="submarine"&&submarine} alt="a carrier"/></div>
                                     </div>
                             ))}
                         </div>
                     </div>
                     
                 </div>
                 <div className="col-lg-4">
                     <h3 className="text-center">Nazi`s Fleet  <img style={{width:`1.3em`}} className="cos-shadow" src={nazi} alt="a nazi flag"/> </h3>
                     <h5 className="msg text-warning text-center">{IAreplay?<Typewriter  
                        onInit={(typewriter)=> { 
                        typewriter 
                        .changeDelay(100)
                        .typeString(IAmessage)
                        .start(); 
                        }}
                         />:"Hello"}
                     </h5>
                     <GameBoard handleShot={handleShot} player={"IA"} battleStart={battleStart} setShips={setShips} ships={ships} dir={dir} cells={IACells} setCells={setIACells} elDrag={elDrag}  />
                 </div>
         </div>
     </div>:<WinnerPage winner={winner} setBattleStart={setBattleStart} setGameStart={setGameStart} />}
     </div>
    )
    
}


export default BattleStart;