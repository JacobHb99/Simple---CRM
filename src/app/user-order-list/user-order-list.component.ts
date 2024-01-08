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

  }
}
