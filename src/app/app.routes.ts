import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { Component } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { MeetingsComponent } from './meetings/meetings.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'user', component: UserComponent},
    {path: 'user/:id', component: UserDetailComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'meetings', component: MeetingsComponent},
    {path: 'about', component: AboutComponent}


];
