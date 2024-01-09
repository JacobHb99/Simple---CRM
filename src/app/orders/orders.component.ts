import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from '../firebase-service.service';
import { arrayRemove, arrayUnion, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  isLoading = true;


  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceService) {}


  ngOnInit() {
    this.firebaseService.getOrders();
  }


  checkOrderAsDone(order: any, $index: any) {
    this.updateStatus(order);
  }


  async updateStatus(order: any) {
    let currentUser = this.firebaseService.getSingleDoc(order.userId);
    console.log('order', order);
    debugger;
    this.deleteOldStatusOrder(currentUser, order);
    order.status = !order.status;
    console.log('order', order);
    this.pushNewStatusOrder(currentUser, order);
  }


  async deleteOldStatusOrder(currentUser: any, order: any) {
    await updateDoc(currentUser, {
      orders: arrayRemove(order)
    });
  }


  async pushNewStatusOrder(currentUser: any, order: any) {
    await updateDoc(currentUser, {
      orders: arrayUnion(order)
    });
  }
}
