import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { City } from '../../shared/models/city.model';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Restaurant } from '../../shared/models/restaurant';
import { MenuItem } from '../../shared/models/menuItem';

@Component({
  selector: 'app-search-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './search-restaurants.component.html',
  styleUrl: './search-restaurants.component.css'
})
export class SearchRestaurantsComponent {

  menuImages: string[] = [
     "/images/restuarant/1.jpg",
     "/images/restuarant/2.jpg",
     "/images/restuarant/3.jpg",
     "/images/restuarant/4.jpg",
     "/images/restuarant/5.jpg",
     "/images/restuarant/6.jpg",
     "/images/restuarant/7.jpg",
     "/images/restuarant/8.jpg",
     "/images/restuarant/9.jpg",
     "/images/restuarant/10.jpg",
     "/images/restuarant/11.jpg",
     "/images/restuarant/112.jpg"
  ];

  cities: City[] = [];
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  menuItems: MenuItem[] = [];

  selectedCityId: string | null = null;
  searchTerm: string = '';

  constructor(private apiService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.apiService.getCities().subscribe({
      next: (data) => this.cities = data,
      error: (err) => console.error('Error loading cities', err)
    });
  }

  onCityChange() {
    if (this.selectedCityId) {
      this.apiService.getRestaurantsByCity(this.selectedCityId).subscribe({
        next: (data) => {
          this.restaurants = data;
          this.filteredRestaurants = data;
        },
        error: (err) => console.error('Error loading restaurants', err)
      });
    } else {
      this.restaurants = [];
      this.filteredRestaurants = [];
    }
  }

  filterRestaurants() {
    const term = (this.searchTerm || '').toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(r =>
      r.name.toLowerCase().includes(term)
    );
  }

  viewMenu(restaurantId: string) {
    this.apiService.getMenuItemsByRestaurant(restaurantId).subscribe({
      next: (data) => this.menuItems = data,
      error: (err) => console.error('Error fetching menu items', err)
    });
  }



currentPage: number = 1;
itemsPerPage: number = 6;

get totalPages(): number {
  return Math.ceil(this.filteredRestaurants.length / this.itemsPerPage);
}

get paginatedRestaurants(): Restaurant[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredRestaurants.slice(start, start + this.itemsPerPage);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}
}
