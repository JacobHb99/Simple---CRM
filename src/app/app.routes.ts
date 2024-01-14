import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { Component } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        data: { animation: 'dashboard' }
    },
    {
        path: 'user', component: UserComponent,
        data: { animation: 'user' }
    },
    {
        path: 'user/:id', component: UserDetailComponent,
        data: { animation: 'openClosePage' }
    },
    {
        path: 'dashboard', component: DashboardComponent,
        data: { animation: 'dashboard' }
    },
    {
        path: 'orders', component: OrdersComponent,
        data: { animation: 'orders' }
    },
    {
        path: 'products', component: ProductsComponent,
        data: { animation: 'products' }
    },
    {
        path: 'about', component: AboutComponent,
        data: { animation: 'about' }
    }
];
