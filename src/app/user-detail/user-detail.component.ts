import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { User } from '../../models/user.class';
import { DocumentData, Firestore, SnapshotOptions, collection, doc, getDoc, getDocFromServer, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { ChangeUserInfoComponent } from '../change-user-info/change-user-info.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NewOrderComponent } from '../new-order/new-order.component';
import { UserOrderListComponent } from '../user-order-list/user-order-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FirebaseServiceService } from '../firebase-service.service';




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
  total = 0;
  latestOrderStamp = '0';
  orders = Array();


  constructor(
    public dialog: MatDialog, 
    public firebaseService: FirebaseServiceService, 
    private route: ActivatedRoute) {

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
    const unsub = onSnapshot(this.firebaseService.getSingleDoc(this.userId), (doc) => {
      let user: any = doc.data();
      if (user != undefined) {
        this.orderAmount = user.orders.length;
        this.orders = user.orders;   
        this.getTotal(user);
        this.checkLatestOrder();
        this.user = new User(doc.data()); 
      } 
  });
  }


  checkLatestOrder() {
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
        let timeStampNumber = Number(order.orderTimeStamp);
        let latestStampNumber = Number(this.latestOrderStamp);
        if (timeStampNumber > latestStampNumber) {
          this.latestOrderStamp = order.orderTimeStamp;
        }
    }
  }


  getTotal(user: any) {
    let price = 0;
    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      order.priceString = order.price * order.amount;
        price += order.priceString;
        order.priceString = this.addDecimalNumbers(order.priceString);
    }
    this.total = price;    
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


  addDecimalNumbers(price: number) {
    let decimalPrice = price.toFixed(2);
    decimalPrice.toString();
    
    return decimalPrice.replace('.', ',');
  }
}
