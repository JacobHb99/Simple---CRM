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
  doneOrders = Array();
  todoOrders = Array();

  constructor() { }


  async getUsers() {
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allUsers = [];
      snapshot.forEach((doc) => {
        this.addId(doc, this.allUsers);
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
      this.clearArrays();
      snapshot.forEach((doc) => {
        this.pushOrders(doc.data(), doc.id);
      });
    });
  }


  clearArrays() {
    this.allUsers = [];
    this.allOrders = [];
    this.doneOrders = [];
    this.todoOrders = [];
  }


  pushOrders(user: any, id: string) {
    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      order.user = `${user.firstName} ${user.lastName}`;
      order.userId = id;
      this.allOrders.push(order);
      this.checkStatus(order);
    }
  }


  checkStatus(order: any) { 
      if (order.status) {
        this.doneOrders.unshift(order);
      } else {
        this.todoOrders.unshift(order);
      }
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
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
