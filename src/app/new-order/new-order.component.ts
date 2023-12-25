import { Component, inject } from '@angular/core';
import { User } from "../../models/user.class";
import { Firestore, arrayUnion, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  user!: User;
  userId!: string;
  firestore: Firestore = inject(Firestore);
  userCollection: any;
  currentUser: any;
  isLoading: boolean = false;
  amountToString: string = '';
  priceToString: string = '';
  orders: any = [];


  order = {
      title: '',
      description: '',
      price: '',
      status: 'todo',
      amount: 0,
    };


  constructor(public dialogRef: MatDialogRef<NewOrderComponent>, private route: ActivatedRoute) {
    this.userCollection = collection(this.firestore, 'users');
    console.log("id", this.userId);
    
  }


  updatePrice() {
    let amount = Number(this.amountToString);
    let price = Number(this.priceToString);
    let total = price * amount;
    this.order.price = total.toFixed(2);
    this.order.amount = amount;
  }


  async saveOrder() {
    let currentUser = doc(this.firestore, "users", this.userId);    
    await updateDoc(currentUser, {
      orders: arrayUnion(this.order)
    });    
  }


  onNoClick(): void {
    this.closeDialog();
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
