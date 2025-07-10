import { Routes } from '@angular/router';

export const routes: Routes = [
        { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart-component/cart-component.component').then((m) => m.CartComponentComponent),
      },
    {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
      },
     {
        path: 'reserve/:id',
        loadComponent: () =>
          import('./pages/reserve-component/reserve-component.component').then((m) => m.ReserveComponentComponent),
      },
    {
        path: 'menu-item/:id',
        loadComponent: () =>
          import('./pages/menuItems/menu-item-details/menu-item-details.component').then((m) => m.MenuItemDetailsComponent),
      },
    {
        path: 'menu-items/:restaurantId',
        loadComponent: () =>
          import('./pages/menuItems/view-menu-item/view-menu-item.component').then((m) => m.ViewMenuItemComponent),
      },
    {
        path: 'home',
        loadComponent: () =>
          import('./pages/search-restaurants/search-restaurants.component').then((m) => m.SearchRestaurantsComponent),
      },
    {
        path: 'my-orders',
        loadComponent: () =>
          import('./pages/my-orders/my-orders.component').then((m) => m.MyOrdersComponent),
      },
    {
        path: '**',
        loadComponent: () =>
          import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
];
