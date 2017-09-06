import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ListMyTutorialsComponent,
  CreateMyTutorialComponent,
  RealTimeClassmatesComponent } from './pages';

const Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'my-tutorials'},
  { path: 'my-tutorials', component: ListMyTutorialsComponent},
  { path: 'my-tutorials/new', component: CreateMyTutorialComponent},
  { path: 'my-classmates', component: RealTimeClassmatesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'my-tutorials' }
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

