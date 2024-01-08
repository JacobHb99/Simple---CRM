import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Firestore, collection, onSnapshot, query, doc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from '../firebase-service.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  allUsers = Array();
  allOrders = Array();
  isLoading = true;




  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceService) {
  }

  ngOnInit() {
    this.firebaseService.getOrders();
  }


  checkOrderAsDone(order: any, $index: any) {
    let orderBefore = order;
    order.status = !order.status;
    this.updateStatus(order, orderBefore);
  }


  async updateStatus(order: any, orderBefore: any) {
    let currentUser = this.firebaseService.getSingleDoc(order.orderId);



    await updateDoc(currentUser, {
      orders: arrayUnion(order)
    });

    await updateDoc(currentUser, {
      orders: arrayRemove(orderBefore)
    });
    
  }


  getDate(timeStamp: any) {
    let date = new Date(timeStamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
