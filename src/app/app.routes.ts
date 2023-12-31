import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { Component } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'user', component: UserComponent},
    {path: 'user/:id', component: UserDetailComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'orders', component: OrdersComponent}
];
