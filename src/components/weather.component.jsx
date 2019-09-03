import React from 'react';
import "./weather.style.css";
 const Weather=(props)=>{
     
     return(
         <div className="container mt-5">
             <div className="row">
                 <div className="m-md-2"><h3>{props.city}</h3></div>
                 <div className="m-md-2"><i className={`wi ${props.weatherIcon} display-3`}></i></div>
                 <div className="m-md-2">{props.temp_celsius?(<h3>Temp : {props.temp_celsius}&deg;</h3>):null}</div>
                 <div className="m-md-2">{props.temp_min?(<h3>Min-Temp : {props.temp_min}&deg;</h3>):null}</div>
                 <div className="m-md-2">{props.temp_max?(<h3>Max-Temp : {props.temp_max}&deg;</h3>):null}</div>
                 <div className="m-md-2"><h3 className="description">{props.description}</h3></div>
             </div>
        </div>
     );
 }

 export default Weather;



