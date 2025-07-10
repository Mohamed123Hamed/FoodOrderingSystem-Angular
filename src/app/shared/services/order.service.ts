import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

 
  reservation: any = {};
  cart: any[] = [];
  totalPrice: number = 0;
  restaurantId: string = '';
  itemName: string = '';

  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;


  placeOrder(orderData: any) {
  return this.http.post(`${this.baseUrl}/Order`, orderData);
}


  getMenuItemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/MenuItem/${id}`);
  }


  getByRestaurantId(restaurantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/MenuItem/GetByRestaurantId/${restaurantId}`);
  }


  getOrdersByPhone(phone: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Order/by-phone/${phone}`);
  }



}
