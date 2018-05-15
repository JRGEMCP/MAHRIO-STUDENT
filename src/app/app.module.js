import 'prismjs';

import { AceEditorModule } from 'ng2-ace-editor';

import { MarkdownModule } from 'ngx-markdown';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CollapseModule } from 'ngx-bootstrap';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HeaderModule } from 'mahrio-header/src/header.module';

import { AppRoutingModule } from './app.routing.js';
import { MainPage } from './main/main.page';
import { Pages} from './pages';
import { Components } from './components';
import { Services } from './services';



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

    BrowserAnimationsModule,
    HeaderModule.forRoot(),
    MarkdownModule.forRoot(),
    AceEditorModule,

    CollapseModule.forRoot(),
    ToastModule.forRoot(),
    // Put this one last to avoid the 404 route capturing all requests
    AppRoutingModule,
  ],
  providers: [
    Services
  ],
  bootstrap: [
    MainPage
  ]
})
export class StudentModule { }
