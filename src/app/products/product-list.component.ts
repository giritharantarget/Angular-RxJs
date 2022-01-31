import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BehaviorSubject, combineLatest, EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductListComponent  {
  pageTitle = 'Product List';
  errorMessage = '';
  //selectedCategoryId = undefined;

  private selectedCategorySubject = new Subject<number>();
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable().pipe(startWith(0));

  categories$ = this.productCategories.productCategories$;
  products$  = combineLatest([this.productService.productWithCategory$, 
                              this.selectedCategoryAction$])
                          .pipe(map(([products , categoryId]) =>
                                    products.filter(e => categoryId ? e.categoryId == categoryId : true)
                                  
                          ));


 // productsFilter$ = this.productService.productWithCategory$
                                     // .pipe(map(products=> products.filter(e => this.selectedCategoryId ? e.categoryId === this.selectedCategoryId : true)))
  sub: Subscription;

  constructor(private productService: ProductService,
    private productCategories : ProductCategoryService) { }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: number): void {
    console.log('Not yet implemented', categoryId);

    this.selectedCategorySubject.next(categoryId);
  }
}
