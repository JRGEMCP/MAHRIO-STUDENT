import { Component } from '@angular/core';
import { TopNavService } from '../../services';

import template from './top-navigation.template.html';
import style from './top-navigation.style.scss';

@Component({
  selector: 'top-navigation',
  template,
  styles: [ style ]
})

export class TopNavComponent {
  static get parameters(){
    return [TopNavService];
  }

  constructor(topNavService){
    this.navService = topNavService;
    this.sections = [];
    this.section = '';
  }
  ngOnInit(){
    this.navService.sections
      .subscribe( sections => {
        this.sections = sections;
        console.log('sections', sections);
    });
  }


}

