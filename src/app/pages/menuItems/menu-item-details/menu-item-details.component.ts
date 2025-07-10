import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  standalone: true,
  imports: [CommonModule,RouterLink],
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrl: './menu-item-details.component.css'
})
export class MenuItemDetailsComponent {
  menuItem: any;

  constructor(private route: ActivatedRoute,
     private _OrderService: OrderService) {}

   ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._OrderService.getMenuItemById(id).subscribe({
        next: res => this.menuItem = res.data,
        error: err => console.error('Error fetching menu item', err)
      });
    }
  }

}
