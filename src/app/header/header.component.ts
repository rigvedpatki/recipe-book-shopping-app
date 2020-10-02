import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EDisplayComponent } from '../shared/types'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() displayComponent = new EventEmitter<EDisplayComponent>()

  collapsed: boolean = true;

  typeOfComponent = EDisplayComponent;

  constructor() { }

  ngOnInit(): void {
    this.displayComponent.emit(EDisplayComponent.RECIPES);
  }

  onSelect(componentType: EDisplayComponent): void {
    if (componentType === EDisplayComponent.RECIPES) {
      this.displayComponent.emit(EDisplayComponent.RECIPES);
    } else if (componentType === EDisplayComponent.SHOPPINGLIST) {
      this.displayComponent.emit(EDisplayComponent.SHOPPINGLIST)
    }
  }

}