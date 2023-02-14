import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public cartCount: number;
  public isSearch: boolean = false;
  public keyword: string;

  constructor(
    private router: Router,
    private service: ApiService
  ) {
    this.service.cart.getAll().subscribe(data => {
      this.cartCount = data.length;
    });
  }

  search() {
    this.router.navigate(['/search/' + this.keyword]);
  }
}
