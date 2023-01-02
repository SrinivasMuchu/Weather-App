
import './App.css';

import React,{useState,useEffect} from 'react'


function App() {
  const [city,setCity] = useState("");
  const [result,setResult] = useState("");
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year);
  }, []);
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  const changeHandler = e =>{
    setCity(e.target.value);
  }
  const submitHandler = e =>{
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`).then(
      response=> response.json()).then(
        data => {
          const kelvin = data.main.temp;
          const celcius = kelvin - 273.15;
          setResult("Temperature at "+city+"\n"+Math.round(celcius)+"°C");
        }
      ).catch(error => console.log(error))
      setCity(city);
  }

  return (
    <div className='app'>
      <center>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Weather App</h1>
            <div className='date-time'><h2>{currentDate}</h2>
            <h2>{date.toLocaleTimeString()}</h2></div><br/>
            <form onSubmit={submitHandler}>
              <input size="30" type="text" name="city" autoComplete='off' placeholder='Enter Your City Name' onChange={changeHandler} value={city}/> <br /><br />
              <input type="submit" value="Get Temperature" />
            </form><br /> <br />
            <div className='result'>
               <h3 >{result}</h3> 
            </div><br/><br/>
          </div>
        </div>
      </center>
    </div>
  )
}

export default App;
