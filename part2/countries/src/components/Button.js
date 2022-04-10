import {useEffect, useState} from 'react';

export const Button = (props) => {
  const { country, toggledCountries, setToggledCountries } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    toggledCountries.includes(country.name.common) ? setShow(true) : setShow(false)
  }, [])


  const toggleCountry = () => {
    debugger;
    if (toggledCountries.includes(country.name.common)) {
      const countryIndex = toggledCountries.indexOf(country.name.common);
      const toggledCountriesCopy = [...toggledCountries];
      toggledCountriesCopy.splice(countryIndex, 1)
      setToggledCountries(toggledCountriesCopy);
      setShow(!show)
    } else {
      const toggledCountriesCopy = [...toggledCountries];
      toggledCountriesCopy.push(country.name.common);
      setToggledCountries(toggledCountriesCopy);
    }
    console.log('toggledCountries', toggledCountries);
    setShow(!show)
  }

  if (show) {
    return (<button onClick={toggleCountry}>hide</button>)
  }
  return (<button onClick={toggleCountry}>show</button>)
}

export default Button;
