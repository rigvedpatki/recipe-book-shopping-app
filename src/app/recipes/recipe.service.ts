import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {


  private recipes: Array<Recipe>;
  public onRecipesChange: Subject<Recipe[]>;

  constructor(private shoppingListService: ShoppingListService) {
    // this.recipes = [
    //   new Recipe(
    //     'Pav bhaji',
    //     'Pav bhaji is a fast food dish from India.',
    //     'https://upload.wikimedia.org/wikipedia/commons/6/63/Pav_Bhaji.jpg',
    //     [
    //       new Ingredient('Pav', 50),
    //       new Ingredient('Potato', 45),
    //       new Ingredient('Capsicum', 75)
    //     ]
    //   ),
    //   new Recipe(
    //     'Gulab jamun',
    //     'Gulab jamun is a milk-solid-based sweet.',
    //     'https://upload.wikimedia.org/wikipedia/commons/8/88/Gulaab_Jamun_%28homemade%21%29_bright.jpg',
    //     [
    //       new Ingredient('Khoya', 110),
    //       new Ingredient('Sugar', 120),
    //       new Ingredient('Rose Water', 150)
    //     ]),
    // ]
    this.recipes = [];
    this.onRecipesChange = new Subject();
  }

  getAllRecipes(): Array<Recipe> {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>): void {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    const index = this.recipes.length - 1;
    this.onRecipesChange.next(this.recipes.slice());
    return index;
  }

  deleteRecipe(index: number): void {
    if (this.recipes[index]) {
      this.recipes = this.recipes.filter((el, i) => i !== index);
      this.onRecipesChange.next(this.recipes.slice());
    }
  }

  setRecipes(recipes: Array<Recipe>): void {
    if (recipes.length > 0) {
      this.recipes = recipes;
      this.onRecipesChange.next(this.recipes.slice());
    }
  }

  updateRecipeById(id: number, recipe: Recipe): void {
    if (this.recipes[id]) {
      this.recipes[id] = recipe;
      this.onRecipesChange.next(this.recipes.slice());
    } else {
      console.log(`Recipe with id ${id} not found`);
    }
  }
}
