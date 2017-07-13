import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent }    from './not-found.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/departments', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class AppRoutingModule { }
