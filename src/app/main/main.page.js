import { Component, ViewEncapsulation } from '@angular/core';

import template from './main.page.html';

import style from '../stylesheets/main.scss';

@Component({
  selector: 'app',
  template,
  styles: [ style ],
  encapsulation: ViewEncapsulation.None,
})

export class MainPage {

}

