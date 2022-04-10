import Country from './Country';

export const Countries = (props) => {
  const { foundCountries } = props;

  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (foundCountries.length === 1) {
    return (
      <Country foundCountries={foundCountries} />
    )
  }
  return foundCountries.map(country => <div key={country.cca2}>{country.name.common}</div>)
}

export default Countries;
