import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  imports: [NgFor,NgIf],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
orders: any[] = [];
  phone: string = '';
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      this.phone = storedPhone;
      this.fetchOrders();
    } else {
      this.error = 'No phone number found. Please place an order first.';
    }
  }

  fetchOrders() {
    this.loading = true;
    this.http.get<any>(`https://localhost:7059/api/Order/by-phone/${this.phone}`)
      .subscribe({
        next: (res) => {
          this.orders = res.data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'No orders found or server error.';
          this.loading = false;
        }
      });
  }

}
