import countriesAndTimezones from 'countries-and-timezones';
import { sortBy, values } from 'lodash/fp';

class CountriesAndTimezones {
  countries() {
    return sortBy(['name'], values(countriesAndTimezones.getAllCountries()));
  }
  timezones(country) {
    if (country) {
      return sortBy(['name'], countriesAndTimezones.getTimezonesForCountry(country));
    } else {
      return sortBy(['name'], values(countriesAndTimezones.getAllTimezones()));
    }
  }
}

export default angular.module('app.common.countriesAndTimezones.service', [
]).service('countriesAndTimezones', CountriesAndTimezones).name;
