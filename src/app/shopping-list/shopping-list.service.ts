import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {

  private ingredients: Array<Ingredient> = [];

  public ingredientsChanged: Subject<Array<Ingredient>>;

  public editIngredient: Subject<number>;

  constructor() {
    this.ingredients = [
      new Ingredient('Ingredient 1', 10),
      new Ingredient('Ingredient 1', 5)
    ];
    this.ingredientsChanged = new Subject();
    this.editIngredient = new Subject();
  }

  getAllIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  getIngredientById(index: number): Ingredient {
    if (this.ingredients[index]) {
      return this.ingredients[index];
    } else {
      return null;
    }
  }

  updateIngredientById(index: number, ingredient: Ingredient): void {
    if (this.ingredients[index]) {
      this.ingredients[index] = ingredient;
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  addIngredientToShoppingList(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>): void {
    this.ingredients = this.ingredients.concat(ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredientFromShoppingList(index: number): void {
    if (this.ingredients[index]) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }
}
