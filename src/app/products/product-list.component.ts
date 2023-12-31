import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string = '';
    errorMessage: string = '';
    sub!: Subscription;

   constructor(private productService: ProductService) {}

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        console.log("setter: ", value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [

    ];

    ngOnInit(): void {
        console.log("Init");
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string):IProduct[] {
        if (filterBy.length == 0){
            return this.products;
        }
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }

}