import "./HomePage.css"


const HomePage=({player,setPlayer,setGameStart})=>{
    const nameInput=(e)=>{
        e.target.value.length<10&&setPlayer(e.target.value)
    }
    const HandleSubmit=(e)=>{
        e.preventDefault()
        setGameStart(true)
    }

        return(
            <div className="container p-3 mt-5 text-white text-shadow   text-center">

                <form className="mt-5 " onSubmit={HandleSubmit} >
                    <input autoFocus value={player} onChange={nameInput} className="NameInput cos-shadow text-shadow" placeholder="Put your name" type="text"/><br/>

                    <button disabled={!player} className="btn btn-outline-success mt-5 btn-lg cos-shadow text-shadow">Start Game</button>
                </form>
            </div>
        )
}


export default HomePage;