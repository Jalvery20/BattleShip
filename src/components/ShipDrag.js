import { useEffect,useState } from "react"



const Ships=({ setElDrag,initialCells,ships,setShips,setBattleStart,IACells,setIACells,setPlayerCells,playerCells})=>{
    const [IACellShip,setIACellShip]=useState([])
    const [playerRandomShip,setPlayerRandomShip]=useState([])
    const [activeRandom,setActiveRandom]=useState(false)
    const handleDrag=(e)=>{
        setElDrag(e.target.id)
        e.dataTransfer.setDragImage(e.target, 0, 0);
    }
    const handleDragEnd=()=>{
        setElDrag(null)
    } 
    const checkCollisions=(locationArray)=>{
        const collisions = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        if(!activeRandom){
            if (locationArray.some((loc) => !IACells[loc])) {
                return false;
            }else if (locationArray.some((loc) => IACells[loc].hasShip)) {
                return false;
            }else if(
                collisions.some((num) => {
                return [num, num + 1].every((combination) =>
                    locationArray.includes(combination)
                ); 
            })
            ) {
                return false;
            }else{
                return true;
            }
        }else{
            if (locationArray.some((loc) => !playerCells[loc])) {
                return false;
            }else if (locationArray.some((loc) => playerCells[loc].hasShip)) {
                return false;
            }else if(
                collisions.some((num) => {
                return [num, num + 1].every((combination) =>
                    locationArray.includes(combination)
                );
            })
            ) {
                return false;
            }else{
                return true;
            }
        }
    } 
    const randomShips=(shipLength,player)=>{
        let dir=["row","col"][Math.floor(Math.random()*2)]
        let possLoc=[]
        for (let i = 0; i < 100; i++) {
            let locationArray=[];
            if(dir==="row"){
                for (let count = 0; count < shipLength; count++) {
                    locationArray.push(i+count)
                }
            }else{
                for (let count = 0; count < shipLength; count++) {
                    locationArray.push(i+count*10)  
                }
            }
            if (checkCollisions(locationArray,player)) {
                possLoc.push(locationArray);
            }
        }
        return possLoc[
            Math.floor(Math.random() * possLoc.length)
        ];
       
    }  
  
    useEffect(()=>{
            if(IACellShip.length===0){
               setIACellShip([...IACellShip,randomShips(2)])
            }else if(IACellShip.length===1){
                setIACellShip([...IACellShip,randomShips(3,"IA")])
                
            } else if(IACellShip.length===2){
                setIACellShip([...IACellShip,randomShips(4,"IA")])
               
            }else if(IACellShip.length===3){
                setIACellShip([...IACellShip,randomShips(5,"IA")])
            }
        
    },[IACells])
    useEffect(()=>{
        if(IACellShip.length===1){
            setIACells(IACells.map((el,i)=>{
                if(i===IACellShip[0][0] ||i===IACellShip[0][1]){
                return {...el,hasShip:true,type:"patrol"} 
                }else{
                return el
                }}))
        }else if(IACellShip.length===2){
            setIACells(IACells.map((el,i)=>{
                if(i===IACellShip[1][0]||i===IACellShip[1][1]||i===IACellShip[1][2]){
                    return {...el,hasShip:true,type:"destroyer"}
                }else{
                return el
                }}))
        }else if(IACellShip.length===3){
            setIACells(IACells.map((el,i)=>{
                if(i===IACellShip[2][0]||i===IACellShip[2][1]||i===IACellShip[2][2]||i===IACellShip[2][3]){
                    return {...el,hasShip:true,type:"submarine"}
                }else{
                return el
                }}))
        }else if(IACellShip.length===4){
            setIACells(IACells.map((el,i)=>{
                if(i===IACellShip[3][0]||i===IACellShip[3][1]||i===IACellShip[3][2]||i===IACellShip[3][3]||i===IACellShip[3][4]){
                    return {...el,hasShip:true,type:"carrier"}
                }else{
                return el
                }}))
        }
    },[IACellShip])

    useEffect(()=>{
        if(activeRandom){
            if(playerRandomShip.length===0){
            setPlayerRandomShip([...playerRandomShip,randomShips(2)])
            }else if(playerRandomShip.length===1){
                setPlayerRandomShip([...playerRandomShip,randomShips(3)])
                
            } else if(playerRandomShip.length===2){
                setPlayerRandomShip([...playerRandomShip,randomShips(4)])
            
            }else if(playerRandomShip.length===3){
                setPlayerRandomShip([...playerRandomShip,randomShips(5)])
            }
        }
    },[playerCells,activeRandom])
useEffect(()=>{
    if(playerRandomShip.length===1){
        setPlayerCells(playerCells.map((el,i)=>{
            if(i===playerRandomShip[0][0] ||i===playerRandomShip[0][1]){
            return {...el,hasShip:true,type:"patrol"} 
            }else{
            return el
            }}))
    }else if(playerRandomShip.length===2){
        setPlayerCells(playerCells.map((el,i)=>{
            if(i===playerRandomShip[1][0]||i===playerRandomShip[1][1]||i===playerRandomShip[1][2]){
                return {...el,hasShip:true,type:"destroyer"}
            }else{
            return el
            }}))
    }else if(playerRandomShip.length===3){
        setPlayerCells(playerCells.map((el,i)=>{
            if(i===playerRandomShip[2][0]||i===playerRandomShip[2][1]||i===playerRandomShip[2][2]||i===playerRandomShip[2][3]){
                return {...el,hasShip:true,type:"submarine"}
            }else{
            return el
            }}))
    }else if(playerRandomShip.length===4){
        setPlayerCells(playerCells.map((el,i)=>{
            if(i===playerRandomShip[3][0]||i===playerRandomShip[3][1]||i===playerRandomShip[3][2]||i===playerRandomShip[3][3]||i===playerRandomShip[3][4]){
                return {...el,hasShip:true,type:"carrier"}
            }else{
            return el
            }}))
    }
},[playerRandomShip])
    
    const handleClick=()=>{
        setPlayerCells(playerCells.map(el=>(el.notAllowed===true ?{...el,notAllowed:false}:el)));setBattleStart(true);
    } 
    const handleRandom=()=>{
        setPlayerCells(initialCells)
        setActiveRandom(true)
        setShips([])

    }
    const handleDragClick=(e)=>{
        setElDrag(e.target.id)
    } 
    return(
        <div  className="img">
            {!activeRandom&&<div className="text-center ">
                <button onClick={handleRandom} className="btn btn-lg  mt-2 cos-shadow btn-outline-warning">Random position 🚢 </button>
            </div>}
            {ships.map((el)=>(
                <div className="container shipImg" key={el.id}>
                    <img   className="mt-3  float-shadow" id={`${el.id}`} src={el.type} onClick={handleDragClick} onDragStartCapture={handleDrag} onDragEndCapture={handleDragEnd} alt="A carrier" />
                </div>)
            )}
            {ships.length===0 &&
            <div className="text-center mt-5">
                <button onClick={handleClick} className="btn btn-lg cos-shadow btn-outline-warning">Start  Battle 💣  </button>

            </div>}
        </div>
    )
}

export default Ships;