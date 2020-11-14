import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipes(): void {
    const recipes = this.recipeService.getAllRecipes();
    this.http
      .put<Array<Recipe>>('https://recipe-book-shopping-app.firebaseio.com/recipes.json', recipes)
      .subscribe();
  }

  fetchRecipes(): Observable<Array<Recipe>> {
    return this.http
      .get<Array<Recipe>>('https://recipe-book-shopping-app.firebaseio.com/recipes.json')
      .pipe(
        map((responseData: Array<Recipe>) => {
          return responseData
            .map((recipe) => {
              const ingredients = recipe
                .ingredients
                .map((ingedient) => new Ingredient(ingedient.name, ingedient.amount));
              return new Recipe(recipe.name, recipe.description, recipe.imagePath, ingredients);
            });
        }),
        tap((recipes: Array<Recipe>) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}