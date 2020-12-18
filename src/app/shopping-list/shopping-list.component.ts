import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Array<Ingredient>;

  private subs: Array<Subscription>;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAllIngredients();
    const sub1 = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Array<Ingredient>) => {
        this.ingredients = ingredients;
      }
    );
    this.subs = [sub1];
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onEditIngredient(index: number): void {
    this.shoppingListService.editIngredient.next(index);
  }

}
