import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);

  useEffect(() => {
    const url = 'https://restcountries.com/v3.1/all'
    axios
      .get(url)
      .then(res => {
        setAllCountries(res.data)
        console.log(allCountries);
      })

  }, [])

  const findCountry = (e) => {
    const foundCountries = allCountries.filter(country => {
      if (country.name.common.toLowerCase().includes(e.target.value.toLowerCase())) {
        return country;
      }
      return false;
    })
    setFoundCountries(foundCountries);
    console.log(foundCountries)
  }

  const renderFoundCountries = () => {
    if (foundCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
    if (foundCountries.length === 1) {
      const country = foundCountries[0];

      return (<div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.keys(country.languages).map(language => <li key={country.languages[language]}>{country.languages[language]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common + ' Flag'}/>
      </div>)
    }
    return foundCountries.map(country => <div key={country.cca2}>{country.name.common}</div>)
  }

  return (
    <div>
      <span>find countries <input type="text" onChange={findCountry}/></span>
      {renderFoundCountries()}
    </div>
  )
}

export default App;
