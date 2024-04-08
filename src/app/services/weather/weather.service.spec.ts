import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import testData from "./testData.json";
import testHouston from "./testHouston.json";
import {PlaceAndWeatherData} from "../../interfaces/weather";

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
    service.dataForCitySubject.next(testData as PlaceAndWeatherData[]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searches for a city', () => {
    const city = 'Houston';
    service.searchCity(city);
    service.dataForCitySubject.subscribe((data) => {
      expect(data.length).toEqual(1);
      expect(data[0].place).toEqual('Houston');
    });
  });

  it('sorts cities by name', () => {
    service.sortCities('name');
    service.dataForCitySubject.subscribe((data) => {
      expect(data[0].place).toEqual('Chicago');
    });
  });

  it('sorts cities by temperature', () => {
    service.sortCities('temp');
    service.dataForCitySubject.subscribe((data) => {
      expect(data[0].place).toEqual('Chicago');
    });
  });

  it('sorts cities by pressure', () => {
    service.sortCities('pressure');
    service.dataForCitySubject.subscribe((data) => {
      expect(data[0].place).toEqual('Houston');
    });
  });

  it('sorts cities by wind', () => {
    service.sortCities('wind');
    service.dataForCitySubject.subscribe((data) => {
      expect(data[0].place).toEqual('Los Angeles');
    });
  });
});

