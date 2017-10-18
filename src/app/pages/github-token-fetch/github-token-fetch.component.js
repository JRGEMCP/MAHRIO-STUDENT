import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthSessionService, ArticleService } from 'mahrio-header/src/services';


@Component({
  selector: 'github-fetch-token',
  template: 'TEST'
})

export class GithubTokenFetchComponent {
  static get parameters(){
    return [OauthSessionService, ActivatedRoute, Router, ArticleService];
  }
  constructor ( oauth, route, router, article ){
    this.oauthService = oauth;
    this.route = route;
    this.router = router;
    this.articleService = article;
  }
  ngOnInit(){
    this.articleService.token
      .flatMap( token => this.oauthService.updateGithubToken( this.route.params.value.token ) )
      .catch( () => { console.log('catcheeed') })
      .subscribe( res => {
        this.router.navigate(['/','dashboard']);
      });
  }
}