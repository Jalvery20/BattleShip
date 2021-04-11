import {useState,useEffect} from "react"

import Ships from "./components/ShipDrag"
import GameBoard from "./components/GameBoard"
import BattleStart from "./components/battleStart"
import "./placeShip.css"


import carrier from "./assets/images/carrier.png"
import destroyer from "./assets/images/destroyer.png"
import patrol from "./assets/images/patrol.png"
import submarine from "./assets/images/submarine.png"

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


const PlaceShip=({setBattleStart,battleStart,player,setGameStart})=>{
        const [elDrag,setElDrag]=useState(null)
        const [playerCells,setPlayerCells]=useState(initialPlayerBoard)
        const [IACells,setIACells]=useState(initialIABoard)
        const [dir,setDir]=useState("row")
        const [ships,setShips]=useState(initialShips)

        

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
       
        return(
            <div>
            {!battleStart ?<div className="row text-white">
                <div className="col-lg-6">
                    <h3 className="text-white text-center mt-5">Drag your ships to the board</h3>
                    <div className="container">
                            <Ships initialCells={initialPlayerBoard}  initialShips={initialShips} IACells={IACells} setIACells={setIACells} playerCells={playerCells} setPlayerCells={setPlayerCells} setBattleStart={setBattleStart} setShips={setShips} ships={ships} carrier={carrier} submarine={submarine} destroyer={destroyer} patrol={patrol} setElDrag={setElDrag} />
                    </div>
                </div>
                <div className="col-lg-6 mt-5">
                        <h3 className="text-white text-center">GameBoard <button  onClick={()=>setDir(dir==="row" ? "Column" : "row")} className="btn cos-shadow btn-outline-warning text-center">Change to {dir==="row" ? "Columns": "Rows"}</button></h3>
                        <GameBoard setElDrag={setElDrag} setShips={setShips} ships={ships} dir={dir} cells={playerCells} setCells={setPlayerCells} elDrag={elDrag}  />
                        
                 </div>
            
            </div>:
             <BattleStart submarine={submarine} patrol={patrol} destroyer={destroyer} carrier={carrier} setGameStart={setGameStart} setBattleStart={setBattleStart} elDrag={elDrag} dir={dir} ships={ships} setShips={setShips} battleStart={battleStart} player={player} IACells={IACells} playerCells={playerCells} setPlayerCells={setPlayerCells} setIACells={setIACells} />
            
            }
            </div>
        )
        
}



export default PlaceShip;