import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EDisplayComponent } from '../shared/types'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = true;

  typeOfComponent = EDisplayComponent;

  constructor() { }

  ngOnInit(): void {
  }

}