import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-cart-component',
  imports: [RouterLink],
  templateUrl: './cart-component.component.html',
  styleUrl: './cart-component.component.css'
})
export class CartComponentComponent {
  cart: any[] = [];
  reservation: any = {};
  totalPrice: number = 0;
  itemName : string ='';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.cart = this.orderService.cart;
    this.reservation = this.orderService.reservation;
    this.totalPrice = this.orderService.totalPrice;
    this.itemName = this.orderService.itemName;
  }


}
