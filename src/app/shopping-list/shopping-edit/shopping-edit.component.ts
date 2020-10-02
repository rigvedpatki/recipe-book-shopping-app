import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amount: ElementRef<HTMLInputElement>;

  @Output() formAction = new EventEmitter<IFormEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(event: Event): void {
    event.preventDefault();
    if (this.name.nativeElement.value && this.amount.nativeElement.value) {
      this.formAction.emit({
        eventType: EFormEventType.ADD,
        data: new Ingredient(this.name.nativeElement.value, parseFloat(this.amount.nativeElement.value))
      });
      this.name.nativeElement.value = null;
      this.amount.nativeElement.value = null;
    } else {
      console.log('Name or amount is null')
    }

  }

  onDeleteItem(): void {
    if (this.name.nativeElement.value && this.amount.nativeElement.value) {
      this.formAction.emit({
        eventType: EFormEventType.DELETE,
        data: new Ingredient(this.name.nativeElement.value, parseFloat(this.amount.nativeElement.value))
      });
      this.name.nativeElement.value = null;
      this.amount.nativeElement.value = null;
    } else {
      console.log('Name or amount is null')
    }

  }

  onClearAll(): void {
    this.formAction.emit({
      eventType: EFormEventType.CLEAR
    });
  }

}

export enum EFormEventType {
  ADD = 'addItem',
  DELETE = 'deleteItem',
  CLEAR = 'clearAll'
}

export interface IFormEvent {
  eventType: EFormEventType,
  data?: Ingredient
}