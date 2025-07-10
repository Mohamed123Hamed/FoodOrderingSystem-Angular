import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule,RouterLink],
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrl: './menu-item-details.component.css'
})
export class MenuItemDetailsComponent {
  menuItem: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`https://localhost:7059/api/MenuItem/${id}`)
      .subscribe({
        next: res => this.menuItem = res.data,
        error: err => console.error('Error fetching menu item', err)
      });
  }
}
