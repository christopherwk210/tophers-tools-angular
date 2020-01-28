import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as components from './components';
import { ClickSelectDirective } from './directives/click-select.directive';

@NgModule({
  declarations: [
    AppComponent,
    ...Object.values(components),
    ClickSelectDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
