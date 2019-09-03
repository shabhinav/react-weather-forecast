import React from 'react';
import './App.css';
import Weather from './components/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './components/form.component'
// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key="3656fd1f8484643b14a14af6aee72606";

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      city:null,
      country:null,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };

    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-strom-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
  };

  calcelsius(temp){
    let cell =Math.floor(temp-273.15)
    return cell;
  }

  get_weatherIcon(icons,rangeid){
    switch(true){
      case rangeid>=200 && rangeid<=232:
      this.setState({icon:this.weatherIcon.Thunderstorm});
      break;
      case rangeid>=300 && rangeid<=321:
      this.setState({icon:this.weatherIcon.Drizzle});
      break;
      case rangeid>=500 && rangeid<=531:
      this.setState({icon:this.weatherIcon.Rain});
      break;
      case rangeid>=600 && rangeid<=622:
      this.setState({icon:this.weatherIcon.Snow});
      break;
      case rangeid>=701 && rangeid<=781:        
      this.setState({icon:this.weatherIcon.Atmosphere});
      break;
      case rangeid===800:
      this.setState({icon:this.weatherIcon.Clear});
      break;
      case rangeid>=801 && rangeid<=804:
      this.setState({icon:this.weatherIcon.Thunderstorm});
      break;
      default:
      this.setState({icon:this.weatherIcon.Clouds});

    }
    console.log(this.icon)
  }

  getWeather=async(e)=>{
    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    console.log(city)
    try{
      if(city&&country){
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
         const response = await api_call.json();
      console.log(response);
      this.setState({
        city:`${response.name},${response.sys.country}`,
        celsius:this.calcelsius(response.main.temp),
        temp_max:this.calcelsius(response.main.temp_max),
        temp_min:this.calcelsius(response.main.temp_min),
        description:response.weather[0].description,
      });
  
      this.get_weatherIcon(this.weatherIcon,response.weather[0].id);
      console.log(response.weather[0].id)
    }
    }
    catch{
    this.setState({error:true})
  }
 
  };
  
  render(){
    return(
      <div className="App topheading">
        <h1>Weather Forecast App</h1>
          <Form loadweather={this.getWeather} error={this.state.error}/>
          <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          />
      </div>
    );
  }
}


export default App;
