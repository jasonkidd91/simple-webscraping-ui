import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'src/app/models/page';
import { CatalogItem } from 'src/app/models/catalog-item';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public pageItems: Array<Page<Array<CatalogItem>>> = [];
  public keyword: string;
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
      this.keyword = params.get('keyword');
      this.loadData();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.page = this.page && this.page > 0 ? this.page : 1;
    this.service.search.getAll(this.keyword, this.page).subscribe(catalog => {
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
