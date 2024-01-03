import { Component } from '@angular/core';
import { Product } from "../../models/product.class";
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { Firestore, collection, onSnapshot, query, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatNativeDateModule,
    MatListModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  allProducts = Array();



  constructor(public dialog: MatDialog, private firestore: Firestore) { }


  ngOnInit() {
    this.getProducts();
  }


  async getProducts() {
    const userCollection = collection(this.firestore, 'products');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allProducts = [];
      snapshot.forEach((doc) => {
        this.setIdField(doc);
      });
    });
  }


  setIdField(data: any) {
    let product = data.data();
    product.idField = data.id;
    this.allProducts.push(product);
    console.log(this.allProducts);
  }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddNewProductComponent, { panelClass: 'custom-container' });
  }


  addDecimalNumbers(price: number) {
    let decimalPrice = price.toFixed(2);
    decimalPrice.toString();
    
    return decimalPrice.replace('.', ',');
  }


  getDate(timeStamp: any) {
    let date = new Date(timeStamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
