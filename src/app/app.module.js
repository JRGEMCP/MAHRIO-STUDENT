import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.js';
import { MainPage } from './main/main.page';
import { Pages} from './pages';
import { Components } from './components';

@NgModule({
  declarations: [
    MainPage,
    ...Pages,
    ...Components,
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
    MainPage
  ]
})
export class AppModule { }
