import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components';

const Routes = [
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

