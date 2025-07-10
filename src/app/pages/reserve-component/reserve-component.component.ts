import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-reserve-component',
  templateUrl: './reserve-component.component.html',
  styleUrl: './reserve-component.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class ReserveComponentComponent {
  reservation: any = {
    name: '',
    phone: '',
    email: '',
    address: ''
  };

  price: number = 0;
  itemName : string = '';

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.price = Number(this.route.snapshot.queryParamMap.get('price')) || 0;
    this.itemName = this.route.snapshot.queryParamMap.get('itemName') || '';
  
  }

  // confirmReservation() {
  //   this.orderService.reservation = {
  //     ...this.reservation,
  //     price: this.price
  //   };

  // this.orderService.totalPrice = this.price;
  //   this.router.navigate(['/cart']);
  // }
  confirmReservation() {
    this.orderService.reservation = {
      ...this.reservation,
      price: this.price,
      itemName:this.itemName
    };
    this.router.navigate(['/cart']);
  }

}
