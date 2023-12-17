import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import {MatNativeDateModule} from '@angular/material/core';
import { User } from "../../models/user.class";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatNativeDateModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})


export class UserComponent {
  user = new User;

  constructor(public dialog: MatDialog) {
    this.user.firstName
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddNewUserComponent, { panelClass: 'custom-container' });
  }



}
