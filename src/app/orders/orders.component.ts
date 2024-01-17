import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from '../firebase-service.service';
import { arrayRemove, arrayUnion, updateDoc } from '@firebase/firestore';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  isLoading = true;
  doneOrders = Array();
  todoOrders = Array();



  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceService) {}


  ngOnInit() {
    this.firebaseService.getOrders();
  }


  checkOrderAsDone(order: any, $index: any) {
    this.updateStatus(order, $index);
  }


  async updateStatus(order: any, i: number) {
    let currentUser = this.firebaseService.getSingleDoc(order.userId);
    let changedOrder = order;

    this.deleteOldStatusOrder(currentUser, order);
    changedOrder.status = !changedOrder.status;
    this.pushNewStatusOrder(currentUser, changedOrder);
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
