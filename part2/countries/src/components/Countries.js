import Country from './Country';

export const Countries = (props) => {
  const { foundCountries, toggledCountries, setToggledCountries } = props;

  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (foundCountries.length === 1) {
    return (
      <Country foundCountries={foundCountries} country={foundCountries[0]}/>
    )
  }
  return foundCountries.map(country => {
    return (
      <div key={country.cca2}>
        <Country country={country} toggledCountries={toggledCountries} setToggledCountries={setToggledCountries}/>
      </div>
    )
  })
}

export default Countries;
