import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  placeOrder(orderData: any) {
  return this.http.post('https://localhost:7059/api/Order', orderData);
}
}
