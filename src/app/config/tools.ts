import { Type } from '@angular/core';
import {
  ColorPickerComponent,
  GmlJavadocGenComponent,
  JsonToDsComponent,
  RatiosComponent
} from '../components/tools';

export interface Tool {
  title: string;
  description: string;
  component: Type<any>;
  route: string;
  category: Category;
}

export enum Category {
  GAMEMAKER = 'GameMaker',
  MATH = 'Math'
}

export const tools: Tool[] = [
  {
    title: 'GM Color Picker',
    description: 'The easy way to get GML color codes.',
    route: '/gm/color-picker',
    component: ColorPickerComponent,
    category: Category.GAMEMAKER
  },
  {
    title: 'GML JavaDoc Gen',
    description: 'Quickly turn GameMaker: Studio script comments into GameMaker Studio 2 compatible JavaDoc comments.',
    route: '/gm/gml-javadoc-gen',
    component: GmlJavadocGenComponent,
    category: Category.GAMEMAKER
  },
  // {
  //   title: 'JSON 2 Data Structure',
  //   description: 'A simple tool to help understand GML data structures. Converts JSON into GML.',
  //   route: 'gm/json-ds',
  //   component: JsonToDsComponent,
  //   category: Category.GAMEMAKER
  // },

  {
    title: 'Ratiomatic',
    description: 'Automatically calculate ratios. Handy for working with resolutions.',
    route: '/math/ratiomatic',
    component: RatiosComponent,
    category: Category.MATH
  }
];
