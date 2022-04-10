export const Filter = (props) => {
  const { allCountries, setFoundCountries } = props;

  const findCountry = (e) => {
    const foundCountries = allCountries.filter(country => {
      if (country.name.common.toLowerCase().includes(e.target.value.toLowerCase())) {
        return country;
      }
      return false;
    })
    setFoundCountries(foundCountries);
  }

  return (
     <div>find countries <input type="text" onChange={findCountry}/></div>
  )
}

export default Filter;
