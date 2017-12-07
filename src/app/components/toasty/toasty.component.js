import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import template from './toasty.template.html';
import style from './toasty.style.scss';

@Component({
  selector: 'toasty-container',
  template,
   styles: [style],
  encapsulation: ViewEncapsulation.None
})

export class ToastyContainerComponent {

}