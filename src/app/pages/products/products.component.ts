import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CatalogItem } from 'src/app/models/catalog-item';
import { Page } from 'src/app/models/page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public pageItems: Array<Page<Array<CatalogItem>>> = [];
  public name: string;
  public page: number;
  public isLoading: boolean;
  public subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: ApiService
  ) { }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.pageItems = [];
      const page = params.get('page');
      this.page = page ? Number(page) : 1;
      this.name = params.get('name');
      this.loadData();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.page = this.page && this.page > 0 ? this.page : 1;
    this.service.products.getAll(this.name, this.page).subscribe(catalog => {
      if (catalog && catalog.items.length > 0) {
        this.pageItems = this.pageItems.concat(new Page(this.page, catalog.items));
        this.page++;
      }
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    });
  }

}
