import {Component, OnInit} from '@angular/core';
import {PlaceAndWeatherData, WeatherData} from "../../interfaces/weather";
import {WeatherService} from "../../services/weather/weather.service";
import {DatePipe, NgForOf} from "@angular/common";
import {FetchData} from "../../classes/fetchData";


@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
  cityWeatherData = new FetchData<PlaceAndWeatherData[]>();

  constructor(private weatherDataService: WeatherService) {}

  ngOnInit() {
    this.cityWeatherData.load(this.weatherDataService.getWeather());
  }
}
