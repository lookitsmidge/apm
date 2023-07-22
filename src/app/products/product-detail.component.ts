import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = "Product Details";
  product: IProduct | undefined;// type of IProduct or Undefined

  constructor(private route: ActivatedRoute, private router:Router, private productService: ProductService) { }

  ngOnInit(): void {
    //executed when component is initialised
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.getProduct(id);
    }
  }

  //gets product from server and saves into 
  getProduct(id: number): void{
    this.productService.getProduct(id).subscribe({
      next: p => this.product = p
  })
  }

ngOnDestroy(){
}

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
