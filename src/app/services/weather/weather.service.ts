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
    dataForCity: PlaceAndWeatherData[] = [];
    dataForCitySubject = new BehaviorSubject<PlaceAndWeatherData[]>([]);
    constructor(private http: HttpClient) {}

    getWeather(refresh= false): Observable<PlaceAndWeatherData[]> {
      this.checkIfWeatherInCache();
      if(this.dataForCity.length > 0 && !refresh) {
        return this.dataForCitySubject.asObservable();
      }

      if(refresh) {
        this.dataForCity = [];
        this.dataForCitySubject.next([]);
        localStorage.removeItem('weatherData');
      }

      this.defaultCities.forEach((defaultCity: coordObject) => {
        this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${defaultCity.lat}&lon=${defaultCity.lon}&appid=${this.apiKey}`)
          .subscribe((data) => {
            this.dataForCitySubject.next([...this.dataForCity, {place: data.name, data: data}]);
            this.dataForCity.push({place: data.name, data: data});
            localStorage.setItem('weatherData', JSON.stringify(this.dataForCity));
          });
      });
      return this.dataForCitySubject.asObservable();
    }

    fetchAdditionalByCoords(lat: number, lon: number) {
      const newCity = this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
      newCity.subscribe((data) => {
        this.dataForCitySubject.next([...this.dataForCity, {place: data.name, data: data}]);
        this.dataForCity.push({place: data.name, data: data});
        localStorage.setItem('weatherData', JSON.stringify(this.dataForCity));
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
          this.dataForCity = this.dataForCity.sort((a, b) => a.place.localeCompare(b.place));
          this.dataForCitySubject.next(this.dataForCity);
          break;
        case 'temp':
          this.dataForCity = this.dataForCity.sort((a, b) => a.data.main.temp - b.data.main.temp);
          this.dataForCitySubject.next(this.dataForCity);
          break;
        case 'pressure':
          this.dataForCity = this.dataForCity.sort((a, b) => a.data.main.pressure - b.data.main.pressure);
          this.dataForCitySubject.next(this.dataForCity);
          break;
        case 'humidity':
          this.dataForCity = this.dataForCity.sort((a, b) => a.data.main.humidity - b.data.main.humidity);
          this.dataForCitySubject.next(this.dataForCity);
          break;
      }
    }

    checkIfWeatherInCache() {
      let weatherData = localStorage.getItem('weatherData');
      if(weatherData) {
        this.dataForCity = JSON.parse(weatherData);
        this.dataForCitySubject.next(this.dataForCity);
      }
    }
}


