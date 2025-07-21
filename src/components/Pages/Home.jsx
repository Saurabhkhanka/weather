import { React, useState } from 'react'
import axios from 'axios'
import { weatherTimeFormator } from '../../helper/helper.js'

const Home = () => {
  const [city, setCity] = useState("")
  const [data, setData] = useState()
  const [temp, setTemp] = useState(0)
  const [time, setTime] = useState({})
  const [weather, setWeather] = useState()




  let imagePath;
  if (weather === "Clear") {
    imagePath = "../../images/clear.png";
  } else if (weather === "Rain") {
    imagePath = "../../images/rainy.webp";
  } else if (weather === "Clouds") {
    imagePath = "../../images/cloudy.png";
  }
  else if (weather === "Thunderstorm") {
    imagePath = "../../images/thunderstorm.png";
  }
  else if (weather === "Drizzle") {
    imagePath = "../../images/drizzle.png";
  }
  else if (weather === "Snow") {
    imagePath = "../../images/snow.png";
  } else {
    imagePath = "../../images/default.png"; // unknown condition
  }

  const handleChange = () => {
    function kelvintotemp(value) {
      return value - 273.15;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=48f497759f9f564b83bee0b43a4dd033&q=${city}`)
      .then((res) => {
        if (res.status === 200) {
          let tempValue = res.data.main.temp;
          let finalValue = kelvintotemp(tempValue).toFixed(0)
          let time = weatherTimeFormator(res.data.sys.sunrise, res.data.sys.sunset)
          setTemp(finalValue)
          setTime(time)
          setData(res.data)
          setWeather(res.data.weather?.[0]?.main)
          // console.log(res.data);
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <div className=' vh-100 vw-100 d-flex flex-column justify-content-center align-item-center'>
        <div className=' text-center '>
          <form className="d-flex m-auto" style={{ color: "white", width: "200px" }} role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={city} onChange={(e) => { setCity(e.target.value) }} />
            <button className="btn btn-outline-success" type="submit" onClick={(e) => { handleChange(e.preventDefault()) }}>Search</button>
          </form>
          <div className="card m-auto mt-2 bg-primary rounded-4 text-white" style={{ width: "fit-content", height: 'fit-content', minWidth: "350px" }}>
            <div className="card-body d-flex flex-column justify-content-center  gap-2">
              <h1 className="card-title">{city ? city : "Select City"}</h1>
              <img className="mx-auto" style={{ width: '100px', height: '100px' }} src={imagePath} />
              <div className='d-flex justify-content-evenly gap-5'>
                <span>Sunrise:{time.sunriseTime}</span>
                <span>Sunset:{time.sunsetTime}</span>
              </div>
              <h1>{temp}<sup>°</sup> C</h1>
              <p>{weather} {time.timeInIST}</p>
              <div className='d-flex justify-content-evenly gap-5'>
                <div><i className="ri-water-percent-line"></i><p>H:{data?.main?.humidity}<sup>*</sup></p></div>
                <div><i className="ri-windy-line"></i><p>W:{data?.wind?.speed}<sup>*</sup></p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home