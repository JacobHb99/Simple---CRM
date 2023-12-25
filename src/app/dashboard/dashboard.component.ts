import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userAmount!: number;
  users$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private http: HttpClient) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection);
    console.log(usersCollection);
    
  }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {

  }
}