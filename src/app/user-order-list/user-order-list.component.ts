import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-order-list',
  standalone: true,
  imports: [],
  templateUrl: './user-order-list.component.html',
  styleUrl: './user-order-list.component.scss'
})
export class UserOrderListComponent {
  @Input() orders!: any;
  dates = Array();

  constructor() {

  }

  ngOnInit() {
  }


  getOrderDate(timeStamp :number) {
      let date = new Date(timeStamp);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}.${month}.${year}`;    
  }

}
