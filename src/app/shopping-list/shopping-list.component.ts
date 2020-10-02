import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IFormEvent, EFormEventType } from './shopping-edit/shopping-edit.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Array<Ingredient> = [
    new Ingredient('Ingredient 1', 10),
    new Ingredient('Ingredient 1', 5)
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onFormEvent(event: IFormEvent): void {
    if (event.eventType === EFormEventType.ADD) {
      this.ingredients.push(event.data);
    } else if (event.eventType === EFormEventType.DELETE) {
      this.ingredients = this.ingredients.filter(ingredient => ingredient.name !== event.data.name && ingredient.amount !== event.data.amount);
    } else if (event.eventType === EFormEventType.CLEAR) {
      this.ingredients = [];
    } else {
      console.log('Invalid form action in shopping-edit')
    }
  }

}
