import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdIconModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MdButtonModule,
    MdIconModule,
    MdToolbarModule
  ]
})
export class MaterialModule {}
