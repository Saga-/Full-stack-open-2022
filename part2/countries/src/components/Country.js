import Button from './Button';

export const Country = (props) => {
  const { country, toggledCountries, setToggledCountries } = props;

  if (toggledCountries.indexOf(country.name.common) !== -1) {
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
