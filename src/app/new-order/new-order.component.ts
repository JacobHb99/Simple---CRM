import { Component, inject } from '@angular/core';
import { User } from "../../models/user.class";
import { Firestore, arrayUnion, collection, doc, onSnapshot, query, updateDoc } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.class';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  user!: User;
  userId!: string;
  firestore: Firestore = inject(Firestore);
  userCollection: any;
  productCollection: any;
  currentUser: any;
  isLoading: boolean = false;
  amountToString: string = '';
  priceToString: string = '';
  allProducts = Array();
  orders: any = [];
  order = Array();
  product!: Product;
  selectedValue!: string;



  constructor(public dialogRef: MatDialogRef<NewOrderComponent>, private route: ActivatedRoute) {
    this.userCollection = collection(this.firestore, 'users');
    this.productCollection = collection(this.firestore, 'products');
  }


  ngOnInit() {
    this.getProducts(this.productCollection);
  }


  async getProducts(collRef: any) {
    const userCollection = collRef;
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allProducts = [];
      snapshot.forEach((doc) => {
        this.allProducts.push(doc.data())
        console.log(this.allProducts);
      });
    });
  }



  updatePrice() {
/*     let amount = Number(this.amountToString);
    let price = Number(this.priceToString);
    let total = price * amount;
    this.product.price = total.toFixed(2);
    this.product.amount = amount; */
  }


  async saveOrder() {
    console.log(this.selectedValue);
    
/*     this.isLoading = true;
    let currentUser = doc(this.firestore, "users", this.userId);
    await updateDoc(currentUser, {
      orders: arrayUnion(this.order)
    });
    this.isLoading = false;
    this.closeDialog(); */
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
