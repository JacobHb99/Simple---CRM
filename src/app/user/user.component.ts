import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from "../../models/user.class";
import { MatListModule } from '@angular/material/list';
import { Firestore, collection, collectionData, addDoc, doc, getDocs, onSnapshot, query } from '@angular/fire/firestore';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatNativeDateModule,
    MatListModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})


export class UserComponent {
  user = new User;
  allUsers = Array();

  constructor(public dialog: MatDialog, private firestore: Firestore) {
  }


  ngOnInit() {
    this.getUsers();
  }


  async getUsers() {
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            this.allUsers.push(change.doc.data());
          }
        if (change.type === "modified") {
            console.log("Modified user: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed user: ", change.doc.data());
        }
        
      });
    });   
    console.log(this.allUsers);
    
  }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddNewUserComponent, { panelClass: 'custom-container' });
  }



}
