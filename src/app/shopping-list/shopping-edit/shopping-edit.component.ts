import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];

  public editMode: boolean;

  public editIngredientIndex: number;

  public editIngredient: Ingredient;

  @ViewChild('formRef') shoppingFormRef: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
    this.editMode = false;
    this.subscriptions = [];
  }

  ngOnInit(): void {
    const editSub = this.shoppingListService.editIngredient
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editIngredientIndex = index;
          this.editIngredient = this.shoppingListService.getIngredientById(this.editIngredientIndex);
          this.shoppingFormRef.setValue({
            name: this.editIngredient.name,
            amount: this.editIngredient.amount
          });
        }
      );
    this.subscriptions.push(editSub);
  }

  onAddOrEditItem(): void {
    const ingredient = this.shoppingFormRef.value;
    const newIngredient = new Ingredient(ingredient.name, parseFloat(ingredient.amount));
    if (this.editMode) {
      this.shoppingListService.updateIngredientById(this.editIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredientToShoppingList(newIngredient);
    }
    this.onClearAll();
  }

  onDeleteItem(): void {
    this.shoppingListService.removeIngredientFromShoppingList(this.editIngredientIndex);
    this.onClearAll();
  }

  onClearAll(): void {
    this.shoppingFormRef.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
