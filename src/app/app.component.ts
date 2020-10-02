import { Component } from '@angular/core';
import { EDisplayComponent } from './shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-book-shopping-app';
  componentToBeDisplayed: EDisplayComponent;
  typeOfComponents = EDisplayComponent;

  onHearderEvent(component: EDisplayComponent): void {
    this.componentToBeDisplayed = component
  }
}
