import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Firestore, collection, onSnapshot, query, doc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
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
        this.pushOrders(doc.data(), doc.id);
      });
    });
  }


  pushOrders(user: any, id: string) {
    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      order.user = `${user.firstName} ${user.lastName}`;
      order.userId = id;
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
  let orderBefore = order;
  order.status = !order.status;
  this.updateStatus(order, orderBefore);
}


async updateStatus(order: any, orderBefore: any) {
  let currentUser = doc(this.firestore, "users", order.userId);

  await updateDoc(currentUser, {
    orders: arrayRemove(orderBefore)
  });

  await updateDoc(currentUser, {
    orders: arrayUnion(order)
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
