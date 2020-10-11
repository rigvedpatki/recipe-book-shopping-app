import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {

  private ingredients: Array<Ingredient> = []

  public ingredientsChanged: Subject<Array<Ingredient>>;

  constructor() {
    this.ingredients = [
      new Ingredient('Ingredient 1', 10),
      new Ingredient('Ingredient 1', 5)
    ];
    this.ingredientsChanged = new Subject();
  }

  getAllIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  addIngredientToShoppingList(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.ingredients = this.ingredients.concat(ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredientFromShoppingList(name: string, amount: number): void {
    const index = this.ingredients.findIndex((ingredient) => ingredient.name === name && ingredient.amount === amount);
    if (this.ingredients[index]) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    } else {
      console.log(`Ingredient with index ${index} in not present`)
    }
  }

  clearShoppingList(): void {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
