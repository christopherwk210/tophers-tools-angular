export interface Tool {
  title: string;
  description: string;
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
    category: Category.GAMEMAKER
  },
  {
    title: 'GML JavaDoc Gen',
    description: 'Quickly turn GameMaker: Studio script comments into GameMaker Studio 2 compatible JavaDoc comments.',
    route: '/gm/gml-javadoc-gen',
    category: Category.GAMEMAKER
  },
  // {
  //   title: 'JSON 2 Data Structure',
  //   description: 'A simple tool to help understand GML data structures. Converts JSON into GML.',
  //   route: 'gm/json-ds',
  //   category: Category.GAMEMAKER
  // },

  {
    title: 'Ratiomatic',
    description: 'Automatically calculate ratios. Handy for working with resolutions.',
    route: '/math/ratiomatic',
    category: Category.MATH
  },
  {
    title: 'Linear Equation Solver',
    description: 'Two points go in, slope and y-intercept come out.',
    route: '/math/linear-equations',
    category: Category.MATH
  }
];
