import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopNavService } from '../../services';

import template from './section-toggle.template.html';
import style from './section-toggle.style.scss';

@Component({
  selector: 'section-toggle',
  template,
  styles: [ style ]
})

export class SectionToggleComponent {
  static get parameters(){
    return [TopNavService, ActivatedRoute];
  }

  constructor(topNavService, route){
    this.navService = topNavService;
    this.sections = [];
    this.section = '';
    this.id = route.params.value.id;
    this.github = false;
  }
  ngOnInit(){
    this.navService.sections
      .subscribe( sections => {
        this.sections = sections;
        this.github = 'https://github.com/MAHRIO/'+this.id+'/blob/master/'+this.sections[0].url+'.md';
      });
  }
  setSection( val ) { console.log( val );
    this.navService.section = val.id;
    this.github = 'https://github.com/MAHRIO/'+this.id+'/blob/master/'+val.url+'.md';
  }

  saveSections(){ console.log('here');
    this.navService.save = true;
  }
}

