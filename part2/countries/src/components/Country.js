export const Country = (props) => {
  const { foundCountries } = props;
  // TODO: Refactor
  const country = foundCountries[0]

  return (
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
  )
}

export default Country;
