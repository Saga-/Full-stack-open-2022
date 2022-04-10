import Button from './Button';
import {useState} from 'react';
import axios from 'axios';

export const Country = (props) => {
  const { country, toggledCountries, setToggledCountries } = props;
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState('');

  const getWeatherInfo = () => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const geoCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=5&appid=${API_KEY}`
    axios
      .get(geoCodeUrl)
      .then(res => {
        const lat = res.data[0].lat;
        const lon = res.data[0].lon;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        const iconUrl = `http://openweathermap.org/img/wn/`
        axios
          .get(weatherUrl)
          .then(res => {
            setTemp(res.data.main.temp)
            setWind(res.data.wind.speed)
            setIcon(`${iconUrl}${res.data.weather[0].icon}@2x.png`)
          })
    })
  }

  if (toggledCountries.indexOf(country.name.common) !== -1) {
    getWeatherInfo();
    return (
      <div>
        <div>
          { country.name.common }
          <Button country={country} toggledCountries={toggledCountries} setToggledCountries={setToggledCountries} />
        </div>
        <div>
          <h1>{country.name.common}</h1>
          <div>capital {country.capital[0]}</div>
          <div>area {country.area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.keys(country.languages).map(language => <li key={country.languages[language]}>{country.languages[language]}</li>)}
          </ul>
          <img src={country.flags.png} alt={country.name.common + ' Flag'}/>
        </div>
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {temp} Celsius</div>
          <div>
            <img src={icon} alt="Weather Icon" />
          </div>
          <div>wind {wind} m/s</div>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    )
  }
  return (
    <div>
      { country.name.common }
      <Button country={country} toggledCountries={toggledCountries} setToggledCountries={setToggledCountries} />
    </div>
  )
}

export default Country;
