import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  categories$;
  product = {};
  id;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productServie: ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productServie.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(productData) {
    this.productServie.create(productData);
    this.router.navigate(['/admin/products']);
  }

  saveProduct(product) {
    if (this.id) this.productServie.update(this.id, product);
    else this.productServie.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  deleteProduct() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productServie.delete(this.id);
    this.router.navigate(['/admin/products']);
  } // End deleteProduct method

}
