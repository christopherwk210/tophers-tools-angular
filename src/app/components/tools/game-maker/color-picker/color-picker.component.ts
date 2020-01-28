import { Component, OnInit } from '@angular/core';

import {
  hexToRgb,
  parseHex,
  rgbToHsv,
  rgbToHex,
  hsvToRgb
} from './color-utils';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  currentColor = '#000000';

  hex = '#000000';
  gmlHex = '$000000';
  gmlRaw = 0;

  r = 0;
  g = 0;
  b = 0;

  h = 0;
  s = 0;
  v = 0;

  gmlRGBbase = 'make_colour_rgb';
  gmlHSVbase = 'make_colour_hsv';

  gmlRGB = 'make_colour_rgb(0, 0, 0);';
  gmlHSV = 'make_colour_hsv(0, 0, 0);';

  hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  constructor() { }

  ngOnInit() {}

  /**
   * Fired whenever a color is chosen through the color picker
   * @param hex HEX color
   */
  handleColorInputChange(hex: string) {
    this.hex = hex;
    this.updateValues();
  }

  handleHexInput(event: InputEvent) {
    const element = event.target as HTMLInputElement;

    // Enforce # character
    if (element.value.charAt(0) !== '#') {
      element.value = `#${element.value}`;
    }

    const validHex = this.hexRegex.test(element.value);

    if (validHex) {
      this.currentColor = element.value;
      this.updateValues();
    }
  }

  handleGmlHexInput(event: InputEvent) {
    const element = event.target as HTMLInputElement;

    // Enforce $ character
    if (element.value.charAt(0) !== '$') {
      element.value = `$${element.value}`;
    }

    if (element.value.length !== 7) return;

    const parsedHex = parseHex(element.value);
    const convertedHex = `#${parsedHex.b}${parsedHex.g}${parsedHex.r}`;

    const validHex = this.hexRegex.test(convertedHex);

    if (validHex) {
      this.currentColor = convertedHex;
      this.updateValues();
    }
  }

  /**
   * Handles new R, G, or B values from text inputs
   * @param rPresent Indicates if the input event is for R
   * @param gPresent Indicates if the input event is for G
   * @param bPresent Indicates if the input event is for B
   */
  handleRGBInput(event: InputEvent, rPresent: boolean, gPresent: boolean, bPresent: boolean) {
    const element = event.target as HTMLInputElement;
    element.value = element.value.replace(/\./g, '');
    element.value = element.value.replace(/\-/g, '');

    const numberVal = Number(element.value);
    if (!isNaN(numberVal)) {
      const rgb = hexToRgb(this.hex);
      const clampedValued = Math.max(Math.min(numberVal, 255), 0);
      const r = rPresent ? clampedValued : rgb[0];
      const g = gPresent ? clampedValued : rgb[1];
      const b = bPresent ? clampedValued : rgb[2];

      this.currentColor = rgbToHex(r, g, b);
      this.updateValues();
    }
  }

  /**
   * Handles new H, S, or V values from text inputs
   * @param hPresent Indicates if the input event is for H
   * @param sPresent Indicates if the input event is for S
   * @param vPresent Indicates if the input event is for V
   */
  handleHSVInput(event: InputEvent, hPresent: boolean, sPresent: boolean, vPresent: boolean) {
    const element = event.target as HTMLInputElement;
    element.value = element.value.replace(/\./g, '');
    element.value = element.value.replace(/\-/g, '');

    const numberVal = Number(element.value);
    if (!isNaN(numberVal)) {
      const clampedValued = Math.max(Math.min(numberVal, 255), 0);

      const rgb = hsvToRgb(
        (hPresent ? clampedValued : this.h) / 255,
        (sPresent ? clampedValued : this.s) / 255,
        (vPresent ? clampedValued : this.v) / 255
      );

      this.currentColor = rgbToHex(
        Math.round(rgb[0]),
        Math.round(rgb[1]),
        Math.round(rgb[2])
        );
      this.updateValues();
    }
  }

  /**
   * Updates all color values based on the current color
   */
  updateValues() {
    this.hex = this.currentColor;

    const parsedHex = parseHex(this.hex);
    this.gmlHex = `$${parsedHex.b}${parsedHex.g}${parsedHex.r}`;
    this.gmlRaw = parseInt(parsedHex.b + parsedHex.g + parsedHex.r, 16);

    const rgb = hexToRgb(this.hex);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];

    const hsv = rgbToHsv(this.r, this.g, this.b);
    this.h = hsv[0];
    this.s = hsv[1];
    this.v = hsv[2];

    this.gmlHSV = `${this.gmlHSVbase}(${this.h}, ${this.s}, ${this.v})`;
    this.gmlRGB = `${this.gmlRGBbase}(${this.r}, ${this.g}, ${this.b})`;
  }
}
