import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

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

}
