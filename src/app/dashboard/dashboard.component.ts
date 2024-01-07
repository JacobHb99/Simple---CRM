import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Firestore, collection, collectionData, doc, getDoc, onSnapshot, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userAmount!: number;
  users$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  allUsers = Array();
  allOrders = Array();
  allAmounts = Array();
  allDates = Array();
  userChartData: any = {
    xData: Array(),
    yData: Array(),
  }
  dateChartData: any = {
    xData: Array(),
    yData: Array(),
  };
  public chart!: any;
  total!: string;


  constructor(private http: HttpClient) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection);
  }


  ngOnInit(): void {
    this.getUsers();
  }


  async getUsers() {
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.allUsers = [];
      snapshot.forEach((doc) => {
        this.addUserId(doc.data(), doc.id);
      });
      this.getOrdersforToday();
      this.createChart("totalsChart", 'bar', this.userChartData, 'Total', 'white');
      this.createChart("datesChart", 'line', this.dateChartData, 'Dates', 'blue');
    });
  }


  addUserId(user: any, id: any) {
    user.idField = id;
    this.allUsers.push(user);
    this.userChartData.xData.push(user.firstName + user.lastName);
    this.pushOrders(user);
  }


  pushOrders(user: any) {
    let price = 0;
    let amount = 0;

    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      let orderPrice = Number(order.price);
      let orderAmount = Number(order.amount);

      this.allOrders.push(order);
      price = this.calculateTotals(price, orderPrice);
      amount = this.calculateTotals(amount, orderAmount);
    }
    this.userChartData.yData.push(Number(price));
    this.allAmounts.push(amount);
  }


  calculateTotals(currentTotal: any, orderPrice: any) {
    return currentTotal += orderPrice;
  }


  getOrdersforToday() {
    let total = 0;
    for (let i = 0; i < this.allOrders.length; i++) {
      const order = this.allOrders[i];
      let date = this.getDate(order.timeStamp);
      this.allDates.push(date);
      this.createDateData();
      total += order.price * order.amount;
      this.total = total.toFixed(2);
    }
  }


  createDateData() {
    this.dateChartData.xData = Array.from(
      this.allDates.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
      (([xData, yData]) => (xData)),
    )
    this.dateChartData.yData = Array.from(
      this.allDates.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
      (([xData, yData]) => (yData)),
    )
  }


  getDate(timeStamp: any) {
    let date = new Date(timeStamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }


  createChart(chartId: string, chartType: any, data: any, label: string, color: any) {
    let chartExist = Chart.getChart(chartId); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();
    this.chart = new Chart(chartId, {
      type: chartType, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: data.xData,
        datasets: [
          {
            label: label,
            data: data.yData,
            backgroundColor: color

          }
        ]
      },
      options: {
        aspectRatio: 4
      }

    });
  }

}