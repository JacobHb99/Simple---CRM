import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, getDoc, getDocFromServer, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { ChangeUserInfoComponent } from '../change-user-info/change-user-info.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NewOrderComponent } from '../new-order/new-order.component';
import { UserOrderListComponent } from '../user-order-list/user-order-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    UserOrderListComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  public user = new User;
  userId!: any;
  orderAmount: number = 0;
  total!: string;
  orders!: any;


  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getId();
  }


  getId() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      this.getUser();
    });
  }


  async getUser() {
    const unsub = onSnapshot(doc(this.firestore, "users", this.userId), (doc) => {
      this.getDate(doc.data());
      this.getTotal(doc.data());
      let user: any = doc.data();
      this.orderAmount = user.orders.length;
      this.orders = user.orders;      
      console.log("Current data: ", doc.data());
      this.user = new User(doc.data());  
  });
  }


  sortOrders() {
    let sortedOrders: any;
    console.log(this.orders);
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
      let id = order.orderId;
    }
    console.log(sortedOrders);
  }


  getTotal(user: any) {
    let price = 0;

    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      let orderPrice = Number(order.price);
        price += orderPrice;
    }
    this.total = price.toFixed(2);    
  }


  getDate(timeStamp: any) {
    let date = new Date(timeStamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`; 
  }


  openChangeUserDialog(): void {
    const dialogRef = this.dialog.open(ChangeUserInfoComponent, { panelClass: 'custom-container' });
    dialogRef.componentInstance.user = new User(this.user.toJson());
    dialogRef.componentInstance.userId = this.userId;    
  }


  openOrderDialog(): void {
    const dialogRef = this.dialog.open(NewOrderComponent, { panelClass: 'custom-container' });
    dialogRef.componentInstance.user = new User(this.user.toJson());
    dialogRef.componentInstance.userId = this.userId;
    dialogRef.componentInstance.storedOrders = this.orders;
  }
}
