import { useEffect,useState} from "react"

const GameBoard=({setElDrag,elDrag,cells,setCells,dir,setShips,ships,battleStart,player,handleShot})=>{
            //Drag Site
    const [displayEffect,setDisplayEffect]=useState(false)
    const handleDragEnter=(e)=>{
        e.preventDefault()
    }  
    const handleDragOver=(e,index)=>{
        e.preventDefault()
        let allCells=e.target.parentElement.children;
        for (let i = 0; i < allCells.length; i++) {
            if(elDrag==="carrier"){
                if(dir==="row"){
                    if(index===i||index+1===i||index+2===i||index+3===i||index+4===i){
                        allCells[i].style.background="green"
                    }
                }else{
                    if(index===i||index+10===i||index+20===i||index+30===i||index+40===i){
                        allCells[i].style.background="green"
                    }
                }
            }else if(elDrag==="submarine") {
                if(dir==="row"){
                    if(index===i||index+1===i||index+2===i||index+3===i){
                        allCells[i].style.background="green"
                    }
                }else{
                    if(index===i||index+10===i||index+20===i||index+30===i){
                        allCells[i].style.background="green"
                    }
                }
            }else if(elDrag==="destroyer") {
                if(dir==="row"){
                    if(index===i||index+1===i||index+2===i){
                        allCells[i].style.background="green"
                    }
                }else{
                    if(index===i||index+10===i||index+20===i){
                        allCells[i].style.background="green"
                    }
                }
            }else if(elDrag==="patrol") {
                if(dir==="row"){
                    if(index===i||index+1===i){
                        allCells[i].style.background="green"
                    }
                }else{
                    if(index===i||index+10===i){
                        allCells[i].style.background="green"
                    }
                }
                
            }
        }
    }
    const handleDragLeave=(e,index)=>{
        e.preventDefault()
        let allCells=e.target.parentElement.children;
        for (let i = 0; i < allCells.length; i++) {
            if(elDrag==="carrier"){
                if(dir==="row"){
                    if(index===i||index+1===i||index+2===i||index+3===i||index+4===i){
                        allCells[i].style.background="#212529"
                    }
                }else{
                    if(index===i||index+10===i||index+20===i||index+30===i||index+40===i){
                        allCells[i].style.background="#212529"
                    }
                }
            }else if(elDrag==="submarine") {
                if(dir==="row"){
                    if(index===i||index+1===i||index+2===i||index+3===i){
                        allCells[i].style.background="#212529"
                    }
                }else{
                    if(index===i||index+10===i||index+20===i||index+30===i){
                        allCells[i].style.background="#212529"
                    }
                }
            }else if(elDrag==="destroyer") {
                if(dir==="row"){
                    if(index===i||index+1===i||index+2===i){
                        allCells[i].style.background="#212529"
                    }
                }else{
                    if(index===i||index+10===i||index+20===i){
                        allCells[i].style.background="#212529"
                    }
                }
            }else if(elDrag==="patrol") {
                if(dir==="row"){
                    if(index===i||index+1===i){
                        allCells[i].style.background="#212529"
                    }
                }else{
                    if(index===i||index+10===i){
                        allCells[i].style.background="#212529"
                    }
                }
            }
        }
    }
    const handleDrop=(e,key)=>{
        e.preventDefault()
        setCells(cells.map((el,i)=>(
           dir==="row" ? 
           elDrag==="carrier"? i===key||i===key+1||i===key+2||i===key+3||i===key+4 ? {...el,hasShip:true,type:"carrier"} : el :
           elDrag==="submarine" ? i===key||i===key+1||i===key+2||i===key+3 ? {...el,hasShip:true,type:"submarine"} : el :
           elDrag==="destroyer" ? i===key||i===key+1||i===key+2 ? {...el,hasShip:true,type:"destroyer"} : el :
           elDrag==="patrol" ? i===key||i===key+1 ? {...el,hasShip:true,type:"patrol"} : el :el :

           elDrag==="carrier"? i===key||i===key+10||i===key+20||i===key+30||i===key+40 ? {...el,hasShip:true,type:"carrier"} : el :
           elDrag==="submarine" ? i===key||i===key+10||i===key+20||i===key+30 ? {...el,hasShip:true,type:"submarine"} : el :
           elDrag==="destroyer" ? i===key||i===key+10||i===key+20 ? {...el,hasShip:true,type:"destroyer"} : el :
           elDrag==="patrol" ? i===key||i===key+10 ? {...el,hasShip:true,type:"patrol"} : el :el 
        )))
        
        setShips(ships.map((el)=>(
            el.id===`${elDrag}` ? {...el,quantity:el.quantity-1} :el
        )))
        setDisplayEffect(true)
        setElDrag(null)

    }
    useEffect(()=>{
        if(displayEffect){
            setShips(ships.filter((el)=>(
                el.quantity!==0 && el 
            )))
            setDisplayEffect(false)
        }        
    },[ships])
            
    return(
        <div className="gridCont">
            <div style={{boxShadow:"1px 1px 10px black"}} className="boardGrid text-center text-white">
                {!battleStart?cells.map((el,i)=>(
                   el.hasShip||el.notAllowed?<div  key={i} style={{border:`${el.hasShip &&"1px solid red"}`,background:`${el.hasShip &&"black"}`,}}   className="cell mb-5"/>:
                   <div key={i} onDragEnterCapture={handleDragEnter} onDragLeaveCapture={(e)=>handleDragLeave(e,i)} onMouseLeave={(e)=>handleDragLeave(e,i)}  onMouseOver={(e)=>handleDragOver(e,i)} onDragOverCapture={(e)=>handleDragOver(e,i)} onClick={(e)=> handleDrop(e,i)} onDropCapture={(e)=> handleDrop(e,i)}  className="cell mb-5"/>
                )):
                player==="human"?
                cells.map((el,i)=>(
                    !el.notAllowed&&!el.isShot?<div key={i} style={{border:`${el.hasShip &&"1px solid red"}`,background:`${el.hasShip &&"black"}`}} className="cell  mb-5"/>
                    :<div key={i} style={{border:`${el.hasShip&&!el.isSunk ?"1px solid red":el.isSunk&&"1px solid grey"}`,background:`${el.hasShip &&"black"}`}} className={`cell ${el.isShot&&!el.isSunk ?"buzz-out":el.isSunk &&"wobble-skew"} text-white text-center mb-5`}><h6>{el.notAllowed ? "Miss":!el.isSunk&&el.isShot&&"Boom"}</h6><h4 className="text-danger">{el.isSunk&&"X"}</h4></div>
                 )):
                 cells.map((el,i)=>(
                    el.notAllowed===false&&!el.isShot?<div onClick={(e)=> handleShot(i,e)} key={i} style={{cursor:"crosshair",background:`${el.isShot &&"rgb(24, 23, 23)"}`,border:`${el.isShot &&"1px solid red"}`}} className="cell battleCell mb-5"></div> 
                    :<div  key={i} style={{cursor:"no-drop",background:`${el.isShot&&!el.isSunk ?"rgb(24, 23, 23)":el.isSunk &&"black"}`,border:`${el.isShot&&!el.isSunk ?"1px solid red":el.isSunk&&"1px solid grey"}`}} className={`cell  ${el.isShot&&!el.isSunk ?"buzz-out":el.isSunk &&"wobble-skew"} text-white text-center battleCell mb-5`}><h6>{el.notAllowed ? "Miss":!el.isSunk&&el.isShot&&"Boom"}</h6><h4 className="text-danger">{el.isSunk&&"X"}</h4></div>
                 ))} 
            </div>
            
        </div>
    )
}

export default GameBoard;