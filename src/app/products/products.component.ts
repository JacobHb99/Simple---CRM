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
import { FirebaseServiceService } from '../firebase-service.service';


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


  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceService) { }


  ngOnInit() {
    this.firebaseService.getProducts();
  }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddNewProductComponent, { panelClass: 'custom-container' });
  }


  addDecimalNumbers(price: number) {
    let decimalPrice = price.toFixed(2);
    decimalPrice.toString();
    
    return decimalPrice.replace('.', ',');
  }
}
