import 'hammerjs';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { NavigationComponent } from './navigation/navigation.component';

import { AppRoutingModule } from './app-routing.module';
import { DepartmentsModule } from './departments/departments.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PositionsModule } from './positions/positions.module';

// Create the client as outlined above

const node = document.getElementById('angular-data');
const data = JSON.parse(node.getAttribute('data'));

const networkInterface = createNetworkInterface('/graphql');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers.authorization = `Token ${data.token}`;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

export function provideClient(): ApolloClient {
  return client;
}


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ApolloModule.forRoot(provideClient),
    DepartmentsModule,
    OrganizationsModule,
    PositionsModule,
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
