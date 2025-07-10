import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './cart-component.component.html',
  styleUrl: './cart-component.component.css'
})
export class CartComponentComponent implements OnInit {
  cart: any[] = [];
  reservation: any = {};
  totalPrice: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.cart = this.orderService.cart;
    this.reservation = this.orderService.reservation;
    this.calculateTotal();
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.orderService.totalPrice = this.totalPrice;
  }
}