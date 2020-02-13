import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";



const APIKEY = '48c4a0b767c988d09cac9cc91b7cbf83';

class App extends React.Component{
    constructor () {
        this.state = {
          temp: null,
          city: null,
          country: null,
          pressure: null,
          sunset: null,
          error: null,
        }
     }

            gettingWeather = async (event) => 
            {
                event.preventDefault();
                var city = event.target.elements.city.value;



                if(city)
                {
                    const api_url = await 
                    fetch(`https://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);
                    const data = await api_url.json();
                    console.log(data);

                    var sunset = data.sys.sunset;
                    var date = new Date();
                    date.setTime(sunset);
                    var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();



                    this.setState
                    ({
                        temp: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        pressure: data.main.pressure,
                        sunset: sunset_date,
                        error: undefined
                    });
                } else
                {
                    this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    pressure: undefined,
                    sunset: undefined,
                    error: "Введите название города"
                    });
                }
            }
            render(){
                return(
                        <div className = "wrapper">
                            <div className = "main">
                            <div className = "container">
                            <div className = "row">
                            <div className = "col-sm-5 info"><Info/></div>
                            <div className = "col-sm-7 form"><Form weatherMethod = {this.gettingWheather}/>
                            <Weather
                                temp={this.state.temp}
                                city={this.state.city}
                                country={this.state.country}
                                pressure={this.state.pressure}
                                sunset={this.state.sunset}
                                error={this.state.error}
                            />
                            <p>{this.props.error}</p>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>

                );
            }
    
}


export default App;