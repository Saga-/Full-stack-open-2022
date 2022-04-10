import {useEffect, useState} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

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

  return (
    <div>
      <Filter allCountries={allCountries} setFoundCountries={setFoundCountries}/>
      <Countries foundCountries={foundCountries} />
    </div>
  )
}

export default App;
