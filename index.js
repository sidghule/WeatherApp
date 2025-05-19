let yourweatherbtn=document.querySelector(".yourweather");
let searchweatherbtn=document.querySelector(".searchweather");

let searchContainer=document.querySelector(".search-weather-container");
let grantContainer=document.querySelector(".grant-access-conatiner");
let yourContainer=document.querySelector(".your-weather-container");
let grantbutton=document.querySelector("#GAbtn");
let searchbtn=document.querySelector("#searchbtn");
let form=document.querySelector(".form");

let Loader=document.querySelector(".loader");



console.log(yourContainer);
console.log(searchContainer);
console.log(grantContainer);
console.log(yourContainer);
// console.log(yourContainer);


oldTab=yourweatherbtn;

oldTab.classList.add("background");
// if(oldTab===yourContainer){
//     yourContainer.classLisy.add("active");
// }
grantContainer.classList.add("active");
yourweatherbtn.addEventListener('click',function(){
    switchTab(yourweatherbtn);
});
searchweatherbtn.addEventListener('click',function(){
    switchTab(searchweatherbtn);
});


function switchTab(newTab){
    if(oldTab!=newTab){
        oldTab.classList.remove("background");
        newTab.classList.add("background");
        oldTab=newTab;
        if(searchContainer.classList.contains("active")){

            searchContainer.classList.remove("active");
            // grantContainer.classList.add("active");
            // yourContainer.classList.add("active");
            getDatafromSessions();
            // console.log("RAMRAM");

        }
        else{
            grantContainer.classList.remove("active");
            yourContainer.classList.remove("active");
            searchContainer.classList.add("active");
        } 

    }

}

grantbutton.addEventListener('click',getLocation);

function getLocation(){
    grantContainer.classList.remove("active");
    Loader.classList.add("active");
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(showPosition)
        console.log("you click on GA btn");
    }
    else{
        console.loglog("failed");
    }
}
function showPosition(locationdata){
    let obj={
        lat:locationdata.coords.latitude,
        lon:locationdata.coords.longitude
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(obj));
    console.log(obj);
    console.log("now colling fetch Function")
    fetchData(obj);

}

function getDatafromSessions(){
    console.log("RAMRAMRAM");
    let localcoordinates=sessionStorage.getItem("user-coordinates");
    console.log(localcoordinates);
    if(localcoordinates){
        let data=JSON.parse(localcoordinates);
        fetchData(data);
    }
    else{
        grantContainer.classList.add("active");
    }
}
async function fetchData(data){
    console.log("fetch function");
    let {lat,lon}=data;
    let API_KEY='26c4ca4a85fc5867455c4c2a32aa3571';
    try{
        // Loader.classList.add("active");
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        let convetdata=await response.json();
        render(convetdata);
        console.log("coverted data",convetdata);
    }
    catch(e){
        console.log("Error");

    }

}
function render(data){
    console.log("render function is there");
    let city=document.querySelector('[country]');
    let countryName=document.querySelector('[img]');
    let how=document.querySelector('[howitis]');
    let windSpeed=document.querySelector('[windSpeed]');
    let  Humidity=document.querySelector('[ Humidity]');
    let clouds=document.querySelector('[clouds]');
    let temp=document.querySelector('[temp]');
    let icon=document.querySelector('[icon]');

    console.log(icon);

    city.innerText=data?.name;
    countryName.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    temp.innerHTML=`${data?.main?.temp}C`;
    windSpeed.innerText=`${data?.wind?.speed}m/s`;
    how.innerText=data?.weather?.[0]?.description;
    console.log("printing icon");
    icon.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;

    Humidity.innerText=`${data?.main?.humidity}%`;
    clouds.innnerText=data?.clouds?.all;
    grantContainer.classList.remove("active");
    Loader.classList.remove("active");
    yourContainer.classList.add("active");
}

form.addEventListener('submit',searchdata);

function searchdata(event){
    event.preventDefault();
    Loader.classList.add("active");
    yourContainer.classList.remove("active");
    let inputV=document.querySelector("#searchcity");
    let city=inputV.value;
    if(city===""){
        return;
    }
    else{
        fetchCityData(city);
    }    
}

async function fetchCityData(city){
    let API_KEY='26c4ca4a85fc5867455c4c2a32aa3571';
    try{

        let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let convertData=await response.json();
        console.log(convertData);
        render(convertData);

    }
    catch(e){
        console.log(e);
    }
 
    
}


// async function dataDetails(){
//     city="goa";
//     let API_KEY='26c4ca4a85fc5867455c4c2a32aa3571';
    // let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//     let data=await response.json();
//     console.log(data);
// }
// dataDetails();

// async function dataDetails1(){
//     lat=12.345;
//     lon=14.787;
//     let API_KEY='26c4ca4a85fc5867455c4c2a32aa3571';

    // let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric)`);
//     let data= await response.json();
//     console.log(data);
// }

// dataDetails1();