import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage, FourOhFourPage } from './pages';

const Routes = [
  { path: '', component: HomePage},
  { path: '**', component: FourOhFourPage, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

