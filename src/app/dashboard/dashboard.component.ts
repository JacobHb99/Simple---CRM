import { Component, Injectable, ViewChildren, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DocumentData, Firestore, collection, collectionData, doc, getDoc, onSnapshot, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Chart from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})

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
  @ViewChildren('totalsChart') totalsChart: any;
  @ViewChildren('datesChart') datesChart: any;
  @ViewChildren('orderStatusChart') orderStatusChart: any;



  constructor(private http: HttpClient) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection);
  }


  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get data from all users from firestore.
   */
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
      this.getOrdersforToday();
      this.createCharts();
    });
  }


  /**
   * Calls function with individual data, to create charts.
   */
  createCharts() {
    this.createChart("totalsChart", 'bar', this.userChartData, 'Totals (€)', 'white');
    this.createChart("datesChart", 'line', this.dateChartData, 'Orders per day', '#f62901');
    this.createDoughnutChart("orderStatusChart", 'doughnut', 'Orderstatus', '#f62901');
  }


  /**
   * Sorts all orders according to status.
   * @param user - current user.
   */
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


  /**
   * Adds document-id from firebase to user-object.
   * @param user 
   * @param id 
   */
  addUserId(user: any, id: any) {
    user.idField = id;
    this.allUsers.push(user);
    this.userChartData.xData.push(user.firstName + user.lastName);
    this.pushOrders(user);
  }


  /**
   * Saves prices, amounts nad totals of all orders and adds the data to the arrays.
   * @param user 
   */
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


  /**
   * Adds the price of the current order to the previous total.
   * @param currentTotal 
   * @param orderPrice 
   * @returns - new total.
   */
  calculateTotals(currentTotal: any, orderPrice: any) {
    return currentTotal += orderPrice;
  }


  /**
   * Calculates the total and order-amount per day.
   */
  getOrdersforToday() {
    let total = 0;
    let stamp = 0;

    for (let i = 0; i < this.allOrders.length; i++) {
      const order = this.allOrders[i];
      this.createDateArray(order, stamp);
      total += order.price * order.amount;
      this.total = total.toFixed(2);
    }
  }


  /**
   * Adds the timestamp of each order and calls a function to generate a date.
   * @param order 
   * @param stamp 
   */
  createDateArray(order: any, stamp: number) {
    this.allDates = [];
    this.stampArr.push(order.orderTimeStamp);
    this.stampArr.sort();

    for (let i = 0; i < this.stampArr.length; i++) {
      const stamp = this.stampArr[i];
      this.allDates.push(this.getDate(stamp));
      console.log(this.allDates);

    }
    this.getLastWeekDates();
  }


  getLastWeekDates() {
    this.dateChartData.xData = [];
    let dayInms = 86400000;
    let today = Date.now();
    this.dateChartData.xData.unshift(this.getDate(today));

    for (let i = 0; i <= 5; i++) {
      today = Number(today) - dayInms;
      let yesterday = Number(today) - dayInms;
      this.dateChartData.xData.unshift(this.getDate(today));
      }
    this.createDateData();
  }


  createDateData() {
    /*     this.dateChartData.xData = Array.from(
          this.allDates.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
          (([xData, yData]) => (xData)),
        ) */

    this.dateChartData.yData = Array.from(
      this.allDates.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
      (([xData, yData]) => (yData)),
    )


    for (let i = 0; i < 7; i++) {
      let result = [];
      const data = this.dateChartData.xData[i];
      let included = this.allDates.includes(data);
      result = this.allDates.filter((date) => date == data);

      if (included) {
        console.log('date', data);
        console.log(result);
        this.dateChartData.yData[i] = result.length;

      } else {
        this.dateChartData.yData[i] = 0;
      }

    }
    console.log(this.dateChartData);
  }


  /**
   * Creates a string with the appropriate date from a timestamp.
   * @param timeStamp 
   * @returns - timestamp as date.
   */
  getDate(timeStamp: any) {
    let date = new Date(timeStamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }


  /**
   * Creates chart.
   * @param chartId 
   * @param chartType 
   * @param data 
   * @param label 
   * @param color 
   */
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
            pointHoverBackgroundColor: '#f62901',
            borderRadius: 16,
            hoverBackgroundColor: '#f21901'
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
            hoverOffset: 8
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }


  changeChartSize() {
    this.totalsChart.canvas.parentNode.style.height = '40vh';
    this.totalsChart.canvas.parentNode.style.width = 'calc(100vw - 112px)';


    this.datesChart.canvas.parentNode.style.height = '40vh';
    this.datesChart.canvas.parentNode.style.width = 'calc(100vw - 112px)';


    this.orderStatusChart.canvas.parentNode.style.height = '40vh';
    this.orderStatusChart.canvas.parentNode.style.width = 'calc(100vw - 112px)';
  }

}