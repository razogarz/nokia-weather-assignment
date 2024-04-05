import { Injectable } from '@angular/core';
import { WeatherData} from "../../interfaces/weather";
import {HttpClient} from "@angular/common/http";
import defaultCities from "../../assets/defaultCities.json";
import coordObject from "../../interfaces/cityAndLocation";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    apiKey = "e3547987b584216f8db68ffcbe14e9b4";
    defaultCities = JSON.parse(JSON.stringify(defaultCities));
    dataForCity: {place: string, data: WeatherData}[] = [];
    searchResults: {place: string, data: WeatherData}[] = [];
    constructor(private http: HttpClient) {}

    getWeather(refresh=false) {
      this.checkIfWeatherInCache();
      if(this.dataForCity.length >= this.defaultCities.length && !refresh) {
        this.searchResults = this.dataForCity;
        return this.searchResults;
      }

      this.defaultCities.forEach((defaultCity: coordObject) => {
        this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${defaultCity.lat}&lon=${defaultCity.lon}&appid=${this.apiKey}`)
          .subscribe((data) => {
            this.dataForCity.push({place: defaultCity.place, data: data});
            localStorage.setItem('weatherData', JSON.stringify(this.dataForCity));
          });
      });
      this.searchResults = this.dataForCity;
      return this.searchResults;
    }

    fetchAdditionalByCoords(lat: number, lon: number) {
      const newCity = this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
      newCity.subscribe((data) => {
        this.dataForCity.push({place: data.name, data: data});
        localStorage.setItem('weatherData', JSON.stringify(this.dataForCity));
      });
    }

    searchCity(city: string) {
      this.searchResults = this.dataForCity.filter((cityData) => {
        return cityData.place.toLowerCase().includes(city.toLowerCase());
      });
      return this.searchResults;
    }

    checkIfWeatherInCache() {
      if(this.dataForCity.length > 0) {
        return;
      }
      let weatherData = localStorage.getItem('weatherData');
      if(weatherData) {
        this.dataForCity = JSON.parse(weatherData);
      }
    }
}


