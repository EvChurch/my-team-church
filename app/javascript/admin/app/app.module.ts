import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonApiModule } from 'angular2-jsonapi';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { NavigationComponent } from './navigation/navigation.component';

import { CommonModule } from './common/common.module';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { DepartmentsModule } from './departments/departments.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    DepartmentsModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
