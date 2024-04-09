import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nokia-weather-app-16.0';
  constructor (private meta: Meta){
    this.meta.addTag({name: 'viewport', content: 'width=device-width, initial-scale=1'});
    this.meta.addTag({name: 'description', content: "Nokia Weather App is a simple Angular application that uses OpenWeatherMap API to display weather information for a given city."});
    this.meta.addTag({name: 'keywords', content: "Angular, OpenWeatherMap, Weather App, Nokia"});
    this.meta.addTag({name: 'author', content: "Patryk Knapek"});
    this.meta.addTag({name: 'robots', content: "index, follow"});
  }
}
