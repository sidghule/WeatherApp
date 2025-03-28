
import { useState} from "react";
import { useEffect } from "react";
import axios from 'axios';
const API_KEY=process.env.REACT_APP_GIPHY_API_KEY;





function useGifs(tag){
       
    const[gif,Setgif]=useState("");
    const url=`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    const url1=`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;


    async function apidata(tag){
        let output=await axios.get(tag?url1:url);
        Setgif(output.data.data.images.downsized_large.url);
        console.log(output);
        console.log("API Key:", API_KEY);
        console.log("API Response:",output);

    }
    useEffect(()=>{
        apidata();
    
    },[])
    


    return{gif,apidata}



} 
export default useGifs;
