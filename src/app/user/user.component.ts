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
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FirebaseServiceService } from '../firebase-service.service';
import { slideInAnimation } from '../_animations';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatNativeDateModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    UserDetailComponent,
    RouterOutlet, 
    RouterModule
  ],
  animations: [
    slideInAnimation
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})


export class UserComponent {
  allUsers = Array();

  constructor(public dialog: MatDialog, public userService: FirebaseServiceService ,private firestore: Firestore) {
    
  }


  ngOnInit() {
    this.userService.getUsers();
  }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddNewUserComponent, { panelClass: 'custom-container' });
  }
}
