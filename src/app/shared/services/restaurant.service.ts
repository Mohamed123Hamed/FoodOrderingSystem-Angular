import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { MenuItem } from '../models/menuItem';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'https://localhost:7059/api';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/City`);
  }

  getRestaurantsByCity(cityId: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/Restaurant/GetByCityId/${cityId}`);
  }

  getMenuItemsByRestaurant(restaurantId: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/MenuItem/GetByRestaurantId/${restaurantId}`);
  }
}
