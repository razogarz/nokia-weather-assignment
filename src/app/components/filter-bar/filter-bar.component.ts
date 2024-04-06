import {Component, OnInit} from '@angular/core';
import {WeatherData} from "../../interfaces/weather";
import {WeatherService} from "../../services/weather/weather.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
    city = {lat: 0, lon: 0};
    constructor(private weatherDataService: WeatherService) {}

    searchCity(event: any) {
      const city = event.target.value;
      console.log(city);
      this.weatherDataService.searchCity(city);
    }

    sortCity(name: string) {
      this.weatherDataService.sortCities(name);
    }

    refreshData() {
      this.weatherDataService.getWeather(true);
    }

  addCity() {
      this.weatherDataService.fetchAdditionalByCoords(this.city.lat, this.city.lon);
  }
}
