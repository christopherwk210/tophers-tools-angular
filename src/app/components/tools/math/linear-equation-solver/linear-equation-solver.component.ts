import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linear-equation-solver',
  templateUrl: './linear-equation-solver.component.html',
  styleUrls: ['./linear-equation-solver.component.scss']
})
export class LinearEquationSolverComponent implements OnInit {

  points = [
    {
      x: 0,
      y: 0
    },
    {
      x: 0,
      y: 0
    }
  ];

  slope = 0;
  intercept = 0;
  invalid = false;

  constructor() { }

  ngOnInit() {
  }

  handlePointUpdate() {
    const parsedPoints = [
      Number(this.points[0].x),
      Number(this.points[0].y),
      Number(this.points[1].x),
      Number(this.points[1].y)
    ];

    this.invalid = parsedPoints.some(point => isNaN(point));

    if (!this.invalid) {
      this.slope = (parsedPoints[3] - parsedPoints[1]) / (parsedPoints[2] - parsedPoints[0]);
      this.intercept = parsedPoints[1] + ((parsedPoints[0] * this.slope) * -1);
    }
  }
}
