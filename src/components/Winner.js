const WinnerPage=({winner,setBattleStart,setGameStart})=>{
    const handleClick=()=>{
        setBattleStart(false)
        setGameStart(false)
    }

   
        return(
            <div className="container mt-5  text-center  text-shadow">
                <div style={{boxShadow:"1px 1px 10px black"}} className="border p-3">
                    <h2 className="text-warning">The Winner is:<br/><h1 style={{fontSize:"100px",fontFamily:"cursive"}} className={winner==="Nazis"?`text-danger`:"text-success"}>{winner}</h1></h2>
                    <button onClick={handleClick} className="btn mt-2 btn-outline-warning btn-lg cos-shadow">Play Again</button>
                </div>
                
            </div>
        )
}


export default WinnerPage