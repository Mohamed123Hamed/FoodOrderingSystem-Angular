import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reserve-component',
  templateUrl: './reserve-component.component.html',
  styleUrl: './reserve-component.component.css',
  standalone: true,
  imports: [FormsModule,NgFor]
})
export class ReserveComponentComponent implements OnInit {
  reservation: any = {
    name: '',
    phone: '',
    email: '',
    address: ''
  };

  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cartItems = this.orderService.cart;
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  confirmReservation() {
    this.orderService.reservation = {
      ...this.reservation,
      totalPrice: this.totalPrice,
      items: this.cartItems
    };
    this.router.navigate(['/cart']);
  }
}