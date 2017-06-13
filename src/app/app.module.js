import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.js';
import { MainComponent, Components } from './components';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    // Angular 2 related modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    // Put this one last to avoid the 404 route capturing all requests
    AppRoutingModule,
  ],
    bootstrap: [
    MainComponent
  ]
})
export class AppModule { }
