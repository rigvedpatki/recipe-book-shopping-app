import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  recipeSelected: EventEmitter<Recipe>;

  private recipes: Array<Recipe>;

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes = [
      new Recipe(
        'Pav bhaji',
        'Pav bhaji is a fast food dish from India.',
        'https://upload.wikimedia.org/wikipedia/commons/6/63/Pav_Bhaji.jpg',
        [
          new Ingredient('Pav', 50),
          new Ingredient('Potato', 45),
          new Ingredient('Capsicum', 75)
        ]
      ),
      new Recipe(
        'Gulab jamun',
        'Gulab jamun is a milk-solid-based sweet.',
        'https://upload.wikimedia.org/wikipedia/commons/8/88/Gulaab_Jamun_%28homemade%21%29_bright.jpg',
        [
          new Ingredient('Khoya', 110),
          new Ingredient('Sugar', 120),
          new Ingredient('Rose Water', 150)
        ]),
    ]

    this.recipeSelected = new EventEmitter();
  }

  getAllRecipes(): Array<Recipe> {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }


}
