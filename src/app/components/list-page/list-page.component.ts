import {Component, OnInit} from '@angular/core';
import {FilterBarComponent} from "../filter-bar/filter-bar.component";
import {WeatherListComponent} from "../weather-list/weather-list.component";
@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    FilterBarComponent,
    WeatherListComponent
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {

}
