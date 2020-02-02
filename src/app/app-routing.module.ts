import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolListComponent } from './components';

import {
  ColorPickerComponent,
  GmlJavadocGenComponent,
  JsonToDsComponent,
  RatiosComponent,
  LinearEquationSolverComponent
} from './components/tools';

const routes: Routes = [
  {
    path: '',
    component: ToolListComponent
  },
  {
    path: 'gm/color-picker',
    component: ColorPickerComponent
  },
  {
    path: 'gm/gml-javadoc-gen',
    component: GmlJavadocGenComponent
  },
  {
    path: 'math/ratiomatic',
    component: RatiosComponent
  },
  {
    path: 'math/linear-equations',
    component: LinearEquationSolverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
