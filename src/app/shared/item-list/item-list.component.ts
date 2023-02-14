import { Component, OnInit, Input } from '@angular/core';
import { CatalogItem } from 'src/app/models/catalog-item';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() public isCart: boolean = false;
  @Input() public items: Array<CatalogItem> = [];
  public cartItems: Array<any> = [];
  public subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private service: ApiService
  ) { }

  ngOnInit() {
    let cartSubscription = this.service.cart.getAll().subscribe(res => {
      this.cartItems = res;
      if (this.isCart) { this.items = res; }
    });
    this.subscription.add(cartSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  open(name: string) {
    this.router.navigate(['/products/' + name]);
  }

  addCart(item: CatalogItem) {
    if (!this.exists(item)) {
      this.service.cart.addItem(item)
        .catch(err => console.error(err));
    }
  }

  removeCart(item: CatalogItem) {
    let cartItem = this.findItem(item);
    if (cartItem) {
      this.service.cart.removeItem(cartItem)
        .catch(err => console.error(err));
    }
  }

  findItem(item: CatalogItem) {
    return this.cartItems.find(i => {
      return i.code == item.code;
    });
  }

  exists(item: CatalogItem) {
    return this.findItem(item) ? true : false;
  }

  waitAndReload(event) {

    const originalSrc = event.target.src;

    if (parseInt(event.target.getAttribute('data-retry'), 10) !== parseInt(event.target.getAttribute('data-max-retry'), 10)) {

      event.target.setAttribute('data-retry', parseInt(event.target.getAttribute('data-retry'), 10) + 1);

      //event.target.src = '/assets/images/placeholder.png';

      setTimeout(function () {
        event.target.src = originalSrc;
      }, 2000);
    } else {
      //event.target.src = '/assets/images/placeholder.png';
    }
  }

}
