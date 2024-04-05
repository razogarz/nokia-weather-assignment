import {Component, OnInit} from '@angular/core';
import {WeatherData} from "../../interfaces/weather";
import {WeatherService} from "../../services/weather/weather.service";

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {

    constructor(private weatherDataService: WeatherService) {}

    searchCity(event: any) {
      const city = event.target.value;
      console.log(city);
      this.weatherDataService.searchCity(city);
    }
}
