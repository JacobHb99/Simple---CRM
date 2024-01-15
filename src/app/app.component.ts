import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { slideInAnimation } from './_animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  HttpClientModule } from '@angular/common/http';
import { BreakpointObserverService } from './breakpoint-observer.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { MobileNavListComponent } from './mobile-nav-list/mobile-nav-list.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    DashboardComponent,
    HttpClientModule,
    MobileNavListComponent
  ],
  animations: [
    slideInAnimation
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  sideNavOpen: BooleanInput = true;
  mobileOn = false;

  constructor(private contexts: ChildrenOutletContexts, public dashboard: DashboardComponent,public breakpointService: BreakpointObserverService) {
    const usersCollection = collection(this.firestore, 'users');
    this.items$ = collectionData(usersCollection);
  }


  ngOnInit() {
    this.breakpointService.mobileOn.subscribe(x => this.mobileOn = x);
    console.log(this.mobileOn);
  }

  prepareRoute() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];    
  }
}
