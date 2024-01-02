// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | undefined; // Define the product type

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      // Load product details based on productId
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    if (this.productId) {
      console.log(this.productId);
      this.productService.getProductById(this.productId).subscribe((product: any) => {
        this.product = product;
        console.log(product);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
