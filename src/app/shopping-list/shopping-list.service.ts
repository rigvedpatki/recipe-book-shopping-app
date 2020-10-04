import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {

  private ingredients: Array<Ingredient> = []

  public ingredientsChanged: EventEmitter<Array<Ingredient>>;

  constructor() {
    this.ingredients = [
      new Ingredient('Ingredient 1', 10),
      new Ingredient('Ingredient 1', 5)
    ];
    this.ingredientsChanged = new EventEmitter();
  }

  getAllIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  addIngredientToShoppingList(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.ingredients = this.ingredients.concat(ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  removeIngredientFromShoppingList(name: string, amount: number): void {
    const index = this.ingredients.findIndex((ingredient) => ingredient.name === name && ingredient.amount === amount);
    if (this.ingredients[index]) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.emit(this.ingredients.slice());
    } else {
      console.log(`Ingredient with index ${index} in not present`)
    }
  }

  clearShoppingList(): void {
    this.ingredients = [];
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
