import {Component, OnInit} from '@angular/core';
import {WeatherData} from "../../interfaces/weather";
import {WeatherService} from "../../services/weather/weather.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css'
})
export class WeatherListComponent implements OnInit {
  cityWeatherData: {place: string, data: WeatherData}[] = [];

  constructor(private weatherDataService: WeatherService) {}

  ngOnInit() {
    this.weatherDataService.getWeather().subscribe((data) => {
      this.cityWeatherData = data;
    });
  }
}
