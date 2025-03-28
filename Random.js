import {useEffect, useState} from "react";
import axios from 'axios';
import useGifs from "../hooks/Gifs";

function Random(){
    const{gif,apidata}=useGifs();

    function changeHandler(){
        apidata();
    }

    
    return(
        <div className="random">
            <h2>A RANDOM GIF</h2>
            <img src={gif}/>
            <button onClick={changeHandler}>
                Generate 
            </button>
        </div>
    )
}
export default Random