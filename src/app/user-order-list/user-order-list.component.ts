import { Component, Input } from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';

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

  constructor(public firebaseService: FirebaseServiceService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
        order.priceString = this.addDecimalNumbers(order.price);
        console.log(order);
    }
  }


  addDecimalNumbers(price: number) {
    let decimalPrice = price.toFixed(2);
    decimalPrice.toString();
    
    return decimalPrice.replace('.', ',');
  }
}
