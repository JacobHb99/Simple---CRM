import { Injectable, inject } from '@angular/core';
import { Firestore, SnapshotOptions, collection, doc, onSnapshot, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  firestore: Firestore = inject(Firestore);
  allUsers = Array();
  allProducts = Array();
  allOrders = Array();

  constructor() { }

  async getUsers() {
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allUsers = [];
      snapshot.forEach((doc) => {
        this.addId(doc, this.allUsers); 
        console.log('users', this.allUsers);
    });
    });   
  }


  async getProducts() {
    const userCollection = collection(this.firestore, 'products');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allProducts = [];
      snapshot.forEach((doc) => {
        this.addId(doc, this.allProducts);
      });
    });
  }


  async getOrders() {
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


  addId(doc: any, arr: any) {
    let object = doc.data();
    object.idField = doc.id;
    arr.push(object); 
}


getSingleDoc(id: string) {
  return doc(this.firestore, "users", id);
}


getDate(timeStamp: any) {
  let date = new Date(timeStamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}.${month}.${year}`; 
}
}
