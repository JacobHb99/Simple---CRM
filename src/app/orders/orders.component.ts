import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Firestore, collection, onSnapshot, query, doc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

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




  constructor(public dialog: MatDialog, private firestore: Firestore) {
  }

  ngOnInit() {
    this.getUsers();
  }


  async getUsers() {
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allUsers = [];
      this.allOrders = [];
      snapshot.forEach((doc) => {
        this.pushOrders(doc.data());
      });
    });
  }


  pushOrders(user: any) {
    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      order.user = `${user.firstName} ${user.lastName}`;
      this.allOrders.push(order);
      
    }
    console.log(this.allOrders); 
  }


  getOrderDate(timeStamp :number) {
    let date = new Date(timeStamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;    
}


checkOrderAsDone(order: any, $index: any) {
  this.allOrders[$index].status = 'done';  
}

}
