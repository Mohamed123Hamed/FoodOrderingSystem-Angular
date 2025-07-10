import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-view-menu-item',
  standalone: true,
  imports: [CommonModule, NgFor,RouterLink],
  templateUrl: './view-menu-item.component.html',
  styleUrl: './view-menu-item.component.css'
})
export class ViewMenuItemComponent implements OnInit {
  menuItems: any[] = [];
  restaurantId!: string;
  itemName!: string;

  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private http: HttpClient
  ) {}

  menuImages: string[] = [
    '/images/10.jpg', '/images/11.jpg', '/images/12.jpg',
    '/images/13.jpg', '/images/14.jpg', '/images/15.jpg',
    '/images/16.jpg', '/images/17.jpg', '/images/18.jpg'
  ];

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId')!;
    this.itemName = this.route.snapshot.paramMap.get('itemName')!;
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.http.get<any[]>(`https://localhost:7059/api/MenuItem/GetByRestaurantId/${this.restaurantId}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.menuItems = data;
        },
        error: (err) => console.error('Error fetching menu items', err)
      });
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.menuItems.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.menuItems.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleAddAndReserve(item: any) {
    const existItem = this.orderService.cart.find(x => x.menuItemId === item.id);
    if (existItem) {
      existItem.quantity += 1;
    } else {
      this.orderService.cart.push({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }

    this.router.navigate(['/reserve', item.id], {
      queryParams: {
        price: item.price,
        itemName: item.name
      }
    });
  }


  addToCart(item: any) {
  const existItem = this.orderService.cart.find(x => x.menuItemId === item.id);
  if (existItem) {
    existItem.quantity += 1;
  } else {
    this.orderService.cart.push({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }
  console.log('Cart:', this.orderService.cart);
}
}