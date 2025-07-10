import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports:[NgFor],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  reservation: any = {};
  cart: any[] = [];
  totalPrice: number = 0;
  restaurantId : string=''
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.reservation = this.orderService.reservation;
    this.cart = this.orderService.cart;
    this.totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // confirmOrder() {
  //   const items = this.cart.map(item => ({
  //     menuItemId: item.menuItemId,
  //     quantity: item.quantity
  //   }));

  //   const body = {
  //     restaurantId: this.orderService.restaurantId,
  //     customerName: this.reservation.name,
  //     phone: this.reservation.phone,
  //     email: this.reservation.email,
  //     address: this.reservation.address,
  //     totalPrice: this.totalPrice,
  //     items
  //   };

  //   console.log('Sending order:', body);

  //   this.orderService.placeOrder(body).subscribe({
  //     next: () => {
  //       alert('Order Placed Successfully 🎉');
  //       this.orderService.cart = [];
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Failed to place order. Please try again.');
  //     }
  //   });
  // }
  confirmOrder() {
  const items = this.cart.map(item => ({
    menuItemId: item.menuItemId,
    quantity: item.quantity
  }));

  const body = {
    restaurantId: this.orderService.restaurantId,
    customerName: this.reservation.name,
    phone: this.reservation.phone,
    email: this.reservation.email,
    address: this.reservation.address,
    items
  };

  // ✅ حفظ رقم الهاتف
  localStorage.setItem('userPhone', this.reservation.phone);

  this.orderService.placeOrder(body).subscribe({
    next: () => {
      alert('Order Placed Successfully 🎉');
      this.orderService.cart = [];
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error(err);
      alert('Failed to place order. Please try again.');
    }
  });
}
}