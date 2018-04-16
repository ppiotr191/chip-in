import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddlistComponent } from './addlist/addlist.component';
import { ChipInService } from './addlist/services/chip-in.service';


@NgModule({
  declarations: [
    AppComponent,
    AddlistComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ChipInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
