import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthSessionService, ArticleService } from 'mahrio-header/src/services';

import template from './github-token-fetch.template.html';

@Component({
  selector: 'github-fetch-token',
  template
})

export class GithubTokenFetchComponent {
  static get parameters(){
    return [OauthSessionService, ActivatedRoute, Router];
  }
  constructor ( oauth, route, router ){
    this.oauthService = oauth;
    this.route = route;
    this.router = router;
  }
  ngOnInit(){
    this.oauthService.authToken
      .flatMap( token => this.oauthService.updateGithub( this.route.params.value.username, this.route.params.value.token ) )
      .catch( () => { console.log('catcheeed') })
      .subscribe( res => {
        this.oauthService.notifyGithub();
        this.onboarded = true;
      });
  }
}