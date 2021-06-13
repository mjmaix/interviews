import React from "react";

interface CountryData {
  name: string;
  alpha3Code: string;
}

interface CountriesSelect {
  name: string;
  value: string;
}

interface Props {}

interface State {
  countries: CountriesSelect[];
  search: string | null;
}

const parseCountryDataToState = (c: CountryData) => ({
  name: c.name,
  value: c.name,
});

const COUNTRIES_API = "https://restcountries.eu/rest/v2";

export const CountriesHooksComponent = (props: Props) => {
  const [countries, setCountries] = React.useState<State["countries"]>([]);
  const [search, setSearch] = React.useState<State["search"]>(null);

  React.useEffect(() => {
    console.log("fetchCountries");
    const fetchCountries = async () => {
      const result = await fetch(`${COUNTRIES_API}/all`);
      const jsonResult: CountryData[] = await result.json();

      if (jsonResult && jsonResult.map) {
        setCountries(jsonResult.map(parseCountryDataToState));
      }
    };
    fetchCountries();
  }, []);

  React.useEffect(() => {
    const searchCountries = async () => {
      if (!!search) {
        const result = await fetch(`${COUNTRIES_API}/name/${search}`);
        const jsonResult = await result.json();

        if (jsonResult && jsonResult.map) {
          setCountries(jsonResult.map(parseCountryDataToState));
        } else {
          setCountries([]);
        }
      }
    };
    searchCountries();
  }, [search]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div>
      <div>Search countries name:</div>
      <input type="text" name="name" onChange={handleChange} />

      <div>
        <br />
        <div>Search result:</div>
        <br />
        {countries.map((country) => {
          return <li key={country.value}>{country.name}</li>;
        })}
      </div>
    </div>
  );
};
