import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from "../../models/user.class";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';



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
    MatProgressBarModule
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
  firestore: Firestore = inject(Firestore);
  userCollection;
  isLoading: boolean = false;


  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>) {
    this.userCollection = collection(this.firestore, 'users');
  }


  /**
   * Sends data freom new user to firebase.
   */
  async saveUser() {
    this.isLoading = true;
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    const docRef = await addDoc(this.userCollection, this.user.toJson());
    this.isLoading = false;
    this.closeDialog();
  }


 /**
 * Closes the dialog-container.
 */
  closeDialog() {
    this.dialogRef.close();
  }


}


