import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
 reservation: any = {};
  cart: any[] = [];
  totalPrice: number = 0;
  itemName:string='';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.reservation = this.orderService.reservation;
    this.cart = this.orderService.cart;
    this.totalPrice = this.orderService.totalPrice;
    this.itemName = this.orderService.itemName
    console.log('Reservation:', this.reservation);
    console.log('Cart:', this.cart);
  }

  confirmOrder() {
    this.orderService.placeOrder().subscribe({
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
