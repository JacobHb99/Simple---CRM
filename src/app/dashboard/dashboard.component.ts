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
  doneOrders = Array();
  todoOrders = Array();
  allAmounts = Array();
  allDates = Array();
  userChartData = {
    xData: Array(),
    yData: Array(),
  }
  dateChartData = {
    xData: Array(),
    yData: Array(),
  };

  public chart!: any;
  total!: string;
  stampArr = Array();



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
      this.todoOrders = [];
      this.doneOrders = [];
      snapshot.forEach((doc) => {
        this.addUserId(doc.data(), doc.id);
        this.checkStatus(doc.data());
      });
      console.log(this.doneOrders);
      console.log(this.todoOrders);

      this.getOrdersforToday();
      this.createChart("totalsChart", 'bar', this.userChartData, 'Totals (€)', 'white');
      this.createChart("datesChart", 'line', this.dateChartData, 'Orders per day', '#f62901');
      this.createDoughnutChart("orderStatusChart", 'doughnut', 'Orderstatus', '#f62901');
    });
  }


  checkStatus(user: any) { 
    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      if (order.status) {
        this.doneOrders.unshift(order);
      } else {
        this.todoOrders.unshift(order);
      }
    }
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
      this.allOrders.push(order);
      price = this.calculateTotals(price, Number(order.price));
      amount = this.calculateTotals(amount, Number(order.amount));
    }
    this.userChartData.yData.push(Number(price));
    this.allAmounts.push(amount);
  }


  calculateTotals(currentTotal: any, orderPrice: any) {
    return currentTotal += orderPrice;
  }


  getOrdersforToday() {
    let total = 0;
    let stamp = 0;

    for (let i = 0; i < this.allOrders.length; i++) {
      const order = this.allOrders[i];
      this.createDateArray(order, stamp);
      total += order.price * order.amount;
      this.total = total.toFixed(2);
    }
    this.createDateData();
  }


  createDateArray(order: any, stamp: number) {
    this.allDates = [];
    this.stampArr.push(order.orderTimeStamp);
    this.stampArr.sort();

    for (let i = 0; i < this.stampArr.length; i++) {
      const stamp = this.stampArr[i];
      this.allDates.push(this.getDate(stamp));
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
    if (chartExist != undefined) {
      chartExist.destroy();
    }
    this.chart = new Chart(chartId, {
      type: chartType, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: data.xData,
        datasets: [
          {
            label: label,
            data: data.yData,
            backgroundColor: color,
            borderColor: 'white',
            pointHoverBackgroundColor: '#f62901'

          }
        ]
      },
      options: {
        aspectRatio: 4,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    });
  }


  createDoughnutChart(chartId: string, chartType: any, label: string, color: any) {
    let chartExist = Chart.getChart(chartId); // <canvas> id
    if (chartExist != undefined) {
      chartExist.destroy();
    }
    this.chart = new Chart(chartId, {
      type: chartType, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Todo', 'Done'],
        datasets: [
          {
            label: label,
            data: [this.todoOrders.length, this.doneOrders.length],
            backgroundColor: [
              '#f21901',
              '#0a373e',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }
        ]
      },
    });
}

}