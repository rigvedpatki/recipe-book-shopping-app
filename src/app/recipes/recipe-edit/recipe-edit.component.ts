import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean = false;
  recipeImagePath: string;
  recipeForm: FormGroup;
  recipeImageInvalid: boolean;
  private subscriptions: Subscription[];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private recipeService: RecipeService) {
    this.recipeImagePath = '';
    this.subscriptions = [];
    this.recipeImageInvalid = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // check if in edit mode
        this.editMode = params['id'] != null;
      }
    );

    this.recipeForm = this.formBuilder.group({
      name: [null, Validators.required],
      imagePath: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(255)]],
      ingredients: this.formBuilder.array([], Validators.required)
    });

    const imagePathSub = this.recipeForm.get('imagePath').valueChanges.subscribe((url: string) => {
      this.recipeImagePath = url;
    });

    this.subscriptions.push(imagePathSub);
  }

  get ingredients() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  onSubmit(): void {
    const ingredients = this.recipeForm.value.ingredients.map(ingredient => new Ingredient(ingredient.name, ingredient.amount));
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      ingredients
    );
    this.recipeService.addRecipe(newRecipe);
  }

  onCancel(): void {
    this.recipeForm.reset();
  }

  onAddIngredient(): void {
    this.ingredients.push(
      this.formBuilder.group({
        name: [null, Validators.required],
        amount: [null, [Validators.required, Validators.pattern(/^(?!0\d)\d*(\.\d+)?$/)]]
      })
    );
  }

  onDeleteIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  getRecipeFormControl(formControlName: string): AbstractControl {
    return this.recipeForm.get(formControlName);
  }

  getIngredientsFormContol(index: number, formControlName: string): AbstractControl {
    return this.ingredients.at(index).get(formControlName)
  }

  isFormControlInvalid(formControlName: string): boolean {
    const formControl = this.getRecipeFormControl(formControlName);
    return formControl.invalid && formControl.touched;
  }
  isFormArrayFormControlInvalid(index: number, formControlName: string): boolean {
    const formControl = this.getIngredientsFormContol(index, formControlName);
    return formControl.invalid && formControl.touched;
  }

  onImageError(error) {
    this.recipeImageInvalid = true;
  }

  onImageLoad(payload) {

    this.recipeImageInvalid = false;
  }

  disableForm(): boolean {
    if (this.recipeForm.invalid === false && this.recipeImageInvalid === false) {
      return false
    } else {
      return true
    }
  }
}
