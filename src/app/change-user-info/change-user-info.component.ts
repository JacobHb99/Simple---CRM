import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, collection, updateDoc, doc } from '@angular/fire/firestore';




@Component({
  selector: 'app-change-user-info',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatProgressBarModule
  ],
  templateUrl: './change-user-info.component.html',
  styleUrl: './change-user-info.component.scss'
})


export class ChangeUserInfoComponent {
  firestore: Firestore = inject(Firestore);
  user!: User;
  userId!: string;
  isLoading: boolean= false;


  constructor(public dialogRef: MatDialogRef<ChangeUserInfoComponent>) {
    const userCollection = collection(this.firestore, 'users');

  }


  ngOnInit() {
    this.getId();
  }


  async getId() {
    await console.log(this.userId);
  }


  async saveUser() {
    this.isLoading = true;
    const userRef = await doc(this.firestore, 'users', this.userId);
    await updateDoc(userRef, this.user.toJson());
    this.closeDialog();
    this.isLoading = false;
  }

  
  onNoClick(): void {
    this.closeDialog();
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
