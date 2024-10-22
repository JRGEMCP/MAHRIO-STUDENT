import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPage } from './main/main.page';
import {
  ListMyTutorialsComponent,
  CreateMyTutorialComponent,
  EditMyTutorialComponent,
  DefineMyTutorialComponent,
  DesignMyTutorialComponent,
  DevelopMyTutorialComponent,
  DeployMyTutorialComponent,
  RealTimeClassmatesComponent,
  GithubTokenFetchComponent} from './pages';


const Routes = [
  {
    path: 'dashboard',
    component: MainPage,
    children: [
      { path: 'github/:username/:token', component: GithubTokenFetchComponent },
      { path: 'my-tutorials', component: ListMyTutorialsComponent},
      { path: 'my-tutorials/new', component: CreateMyTutorialComponent},
      { path: 'my-tutorials/:id/edit', component: EditMyTutorialComponent},
      { path: 'my-tutorials/:id/define', component: DefineMyTutorialComponent},
      { path: 'my-tutorials/:id/design', component: DesignMyTutorialComponent},
      { path: 'my-tutorials/:id/develop', component: DevelopMyTutorialComponent},
      { path: 'my-tutorials/:id/deploy', component: DeployMyTutorialComponent},
      { path: 'my-classmates', component: RealTimeClassmatesComponent},
      { path: '**', pathMatch: 'full', redirectTo: 'my-tutorials' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

