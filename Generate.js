import {useEffect, useState} from "react";
import axios from 'axios';
import useGifs from "../hooks/Gifs";
const API_KEY=process.env.REACT_APP_GIPHY_API_KEY;

function Generate(){
    const[tag,setTag]=useState('car');
    const{gif,apidata}=useGifs(tag);
    function clickHandler(event){
        setTag(event.target.value);
    

    }
    function changeHandler(){
        apidata(tag);
    }

    

    
    return(
        <div className="random1">
            <h2>A RANDOM GIF</h2>
            <img src={gif}/>
            
            <input className="input"
                type="text"
                onChange={clickHandler}
            />
            <button onClick={changeHandler}>
                Generate 
            </button>
        </div>
    )
}
export default Generate