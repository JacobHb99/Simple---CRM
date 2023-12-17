import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { User } from "../../models/user.class";




@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [  
    MatDatepickerModule,  
    MatNativeDateModule
  ],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})


export class AddNewUserComponent {
  user = new User;
  dateOfBirth!: Date;



  constructor(public dialog: MatDialog) {}


  onNoClick(): void {
  }


  saveUser() {
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    console.log(this.user);
  }

}
