import { Injectable } from '@angular/core';
import {PlaceAndWeatherData, WeatherData} from "../../interfaces/weather";
import {HttpClient} from "@angular/common/http";
import defaultCities from "../../assets/defaultCities.json";
import coordObject from "../../interfaces/cityAndLocation";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    apiKey = "e3547987b584216f8db68ffcbe14e9b4";
    defaultCities = JSON.parse(JSON.stringify(defaultCities));
    dataForCitySubject = new BehaviorSubject<PlaceAndWeatherData[]>([]);
    constructor(private http: HttpClient) {}

    getWeather(refresh= false): Observable<PlaceAndWeatherData[]> {
      this.checkIfWeatherInCache();
      if(this.dataForCitySubject.value.length > 0 && !refresh) {
        return this.dataForCitySubject.asObservable();
      }

      if(refresh) {
        this.dataForCitySubject.next([]);
        localStorage.removeItem('weatherData');
      }

      this.defaultCities.forEach((defaultCity: coordObject) => {
        this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${defaultCity.lat}&lon=${defaultCity.lon}&appid=${this.apiKey}`)
          .subscribe((data) => {
            this.dataForCitySubject.next([...this.dataForCitySubject.value, {place: data.name, data: data}]);
            localStorage.setItem('weatherData', JSON.stringify(this.dataForCitySubject.value));
          });
      });
      return this.dataForCitySubject.asObservable();
    }

    fetchAdditionalByCoords(lat: number, lon: number) {
      const newCity = this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
      newCity.subscribe((data) => {
        let allCities = localStorage.getItem('weatherData');
        let cities = allCities ? JSON.parse(allCities) : [];
        if(cities) {
          cities.push({place: data.name, data: data});
          localStorage.setItem('weatherData', JSON.stringify(cities));
          if(this.dataForCitySubject.value.length === cities.length - 1)
            this.dataForCitySubject.next([...this.dataForCitySubject.value, {place: data.name, data: data}]);
        }
      });
    }

    searchCity(city: string) {
      let cachedCities = localStorage.getItem('weatherData');
      if(cachedCities) {
        let cities = JSON.parse(cachedCities);
        let searchResult = cities.filter((cityData: PlaceAndWeatherData) => cityData.place.toLowerCase().includes(city.toLowerCase()));
        this.dataForCitySubject.next(searchResult);
      }
    }

    sortCities(sortBy: string) {
      switch (sortBy) {
        case 'name':
          let sorted_name = this.dataForCitySubject.value.sort((a, b) => a.place.localeCompare(b.place));
          this.dataForCitySubject.next(sorted_name);
          break;
        case 'temp':
          let sorted_temp = this.dataForCitySubject.value.sort((a, b) => a.data.main.temp - b.data.main.temp);
          this.dataForCitySubject.next(sorted_temp);
          break;
        case 'pressure':
          let sorted_pressure = this.dataForCitySubject.value.sort((a, b) => a.data.main.pressure - b.data.main.pressure);
          this.dataForCitySubject.next(sorted_pressure);
          break;
        case 'wind':
          let sorted_humidity = this.dataForCitySubject.value.sort((a, b) => a.data.wind.speed - b.data.wind.speed);
          this.dataForCitySubject.next(sorted_humidity);
          break;
      }
    }

    checkIfWeatherInCache() {
      let weatherData = localStorage.getItem('weatherData');
      if(weatherData)
        this.dataForCitySubject.next(JSON.parse(weatherData));
    }
}
