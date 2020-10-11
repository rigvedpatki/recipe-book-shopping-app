import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, AfterViewInit {

  @ViewChild('nameInput') name: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amount: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  onAddItem(event: Event): void {
    event.preventDefault();
    if (this.name.nativeElement.value && this.amount.nativeElement.value) {
      this.shoppingListService.addIngredientToShoppingList(new Ingredient(this.name.nativeElement.value,
        parseFloat(this.amount.nativeElement.value)));
      this.name.nativeElement.value = null;
      this.amount.nativeElement.value = null;
    } else {
      console.log('Name or amount is null')
    }

  }

  onDeleteItem(): void {
    if (this.name.nativeElement.value && this.amount.nativeElement.value) {
      this.shoppingListService.removeIngredientFromShoppingList(
        this.name.nativeElement.value,
        parseFloat(this.amount.nativeElement.value)
      )
      this.name.nativeElement.value = null;
      this.amount.nativeElement.value = null;
    } else {
      console.log('Name or amount is null')
    }

  }

  onClearAll(): void {
    this.shoppingListService.clearShoppingList();
  }

}
