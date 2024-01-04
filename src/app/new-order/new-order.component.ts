import { Component, QueryList, ViewChildren, inject } from '@angular/core';
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
import { SingleOrderInputComponent } from '../single-order-input/single-order-input.component';
import { empty } from 'rxjs';
import { update } from '@angular/fire/database';


@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    SingleOrderInputComponent
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  user!: User;
  userId!: string;
  storedOrders!: any;
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
  selectedProduct = {
    product: {},
    amount: 1,
  }
  selectedValue: any = [];
  inputs = [
    '',
  ];
  currentOrder = Array();



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
    this.filterOrder();
    this.storedOrders.push(this.currentOrder);
    console.log(this.storedOrders);

    this.isLoading = true;
    let currentUser = doc(this.firestore, "users", this.userId);
    console.log(currentUser);
    for (let i = 0; i < this.storedOrders.length; i++) {
      const order = this.storedOrders[i];

      for (let k = 0; k < order.length; k++) {
        const element = order[k];
        element.orderId = i;
        await updateDoc(currentUser, {
          orders: arrayUnion(element)
        });
      }
    }
    this.isLoading = false;
    this.closeDialog();
  }


  filterOrder() {
    console.log('currentOrder', this.currentOrder);
    for (let i = 0; i < this.currentOrder.length; i++) {
      const task = this.currentOrder[i];
      if (task == undefined) {
        this.currentOrder.splice(i, 1);
      }
    }
    console.log('currentOrder after', this.currentOrder);
  }


  addOrderTask($event: any, $index: number) {
    this.currentOrder[$index] = $event;
  }


  addInputField() {
    let html: string =/*html*/`
      <app-single-order-input (singleProduct)="addOrderTask($event)" [allProducts]="allProducts"></app-single-order-input>
    `;
    this.inputs.push(html);
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
