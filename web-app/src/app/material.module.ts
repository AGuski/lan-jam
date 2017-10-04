import { NgModule } from '@angular/core';
import { MdButtonModule, MdToolbarModule, MdChipsModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdButtonModule,
    MdChipsModule,
    MdInputModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdChipsModule,
    MdInputModule
  ]
})
export class MaterialModule { }
