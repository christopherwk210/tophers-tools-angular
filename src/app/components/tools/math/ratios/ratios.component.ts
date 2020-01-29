import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratios',
  templateUrl: './ratios.component.html',
  styleUrls: ['./ratios.component.scss']
})
export class RatiosComponent implements OnInit {
  inputsLocked = false;
  loading = false;

  numerator = '0';
  denominator = '0';

  subNumerator = '0';
  subDenominator = '0';
  subRatios: number[] = [];

  supportsWebWorkers = !!window['Worker'];

  constructor() { }

  ngOnInit() {}

  async submit() {
    if (this.inputsLocked) return;
    if (!this.checkInputsValid()) return;

    this.inputsLocked = true;
    this.loading = true;
    const result = await this.calculateRatios(this.numerator, this.denominator);
    this.loading = false;

    if (result) {
      this.subRatios = result.reverse();
    } else {
      return;
    }
  }

  calculateRatios(numerator, denominator): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./ratio-math.worker', { type: 'module' });
      let terminated = false;

      worker.onmessage = e => {
        if (terminated) return;
        worker.terminate();
        resolve(e.data);
      };

      // Add a 5 second timeout to prevent hangs
      setTimeout(() => {
        terminated = true;
        worker.terminate();
        resolve(null);
      }, 5000);

      worker.postMessage([numerator, denominator]);
    });
  }

  reset() {
    if (this.loading) return;

    this.inputsLocked = false;
    this.subRatios = [];
    this.subNumerator = '0';
    this.subDenominator = '0';
  }

  handleNumeratorChange(event: InputEvent) {
    const numberValue = Number((event.target as HTMLInputElement).value);
    if (isNaN(numberValue)) return;

    const crossDivide = numberValue * Number(this.denominator);
    this.subDenominator = `${crossDivide / Number(this.numerator)}`;
  }

  handleDenominatorChange(event: InputEvent) {
    const numberValue = Number((event.target as HTMLInputElement).value);
    if (isNaN(numberValue)) return;

    const crossDivide = numberValue * Number(this.numerator);
    this.subNumerator = `${crossDivide / Number(this.denominator)}`;
  }

  handleRatioSelect(ratio: number[]) {
    this.subNumerator = ratio[0] + '';
    this.subDenominator = ratio[1] + '';
  }

  checkInputsValid() {
    return !this.loading &&
      this.numerator.length > 0 && this.denominator.length > 0 &&
      !isNaN(Number(this.numerator)) && !isNaN(Number(this.denominator));
  }
}
