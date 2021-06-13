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

export class CountriesClassComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      countries: [],
      search: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    const result = await fetch(`${COUNTRIES_API}/all`);
    const countries: CountryData[] = await result.json();

    const countriesParsed = countries.map(parseCountryDataToState);

    this.setState({
      countries: countriesParsed,
    });
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.search && prevState.search !== this.state.search) {
      const result = await fetch(`${COUNTRIES_API}/name/${this.state.search}`);
      const countries = await result.json();

      this.setState({
        countries: countries.map(parseCountryDataToState),
      });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({ search: event.target.value });
  }

  render() {
    return (
      <div>
        <div>Search countries name:</div>
        <input type="text" name="name" onChange={this.handleChange} />

        <div>
          <br />
          <div>Search result:</div>
          <br />
          {this.state.countries.map((country) => {
            return <li key={country.value}>{country.name}</li>;
          })}
        </div>
      </div>
    );
  }
}
