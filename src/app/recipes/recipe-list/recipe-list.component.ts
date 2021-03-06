import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Array<Recipe>;

  private subscriptions: Subscription[];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAllRecipes();

    const recipeSub = this.recipeService.onRecipesChange
      .subscribe(
        (recipes: Array<Recipe>) => {
          this.recipes = recipes;
        }
      );

    this.subscriptions.push(recipeSub);

  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
