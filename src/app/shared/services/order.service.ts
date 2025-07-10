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

  placeOrder() {
    const items = this.cart.map(item => ({
      menuItemId: item.menuItemId,
      quantity: 1
    }));

    const body = {
      restaurantId: this.restaurantId,
      items
    };

    console.log('sending body', body);

    return this.http.post('https://localhost:7059/api/Order', body);
  }
}
