import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gml-javadoc-gen',
  templateUrl: './gml-javadoc-gen.component.html',
  styleUrls: ['./gml-javadoc-gen.component.scss']
})
export class GmlJavadocGenComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  gmlFuncRegex = /(^[A-Za-z_])([A-Za-z_0-9])*(\s?)(\()(\s*)(([A-Za-z_])([A-Za-z_0-9])*)+(((\s*)([,]?)(\s*)([A-Za-z_])([A-Za-z_0-9])*)*(\s*)(\)))/;

  gmsFunc = '';
  output = '';

  desc = '/// @description ';
  param = '/// @param ';
  arg = '/// @arg ';

  argsSwitch = false;

  constructor() { }

  ngOnInit() {
  }

  handleSwitchToggle(event: InputEvent) {
    const checked = (event.target as HTMLInputElement).checked;
    this.argsSwitch = checked;
    this.updateOutput(this.gmsFunc, this.argsSwitch);
  }

  handleFuncChange(event: InputEvent) {
    const func = (event.target as HTMLInputElement).value;
    this.gmsFunc = func;
    this.updateOutput(this.gmsFunc, this.argsSwitch);
  }

  updateOutput(func: string, useArgs: boolean) {
    // Output string
    let javaDocStr = '';

    // Remove slashes in the front and trim
    const noSlashes = func.replace(/(^[/]+)/g, '').trim();

    // Test the regex
    if (this.gmlFuncRegex.test(noSlashes)) {
      const paramString = useArgs ? this.arg : this.param;

      // Get just the function name
      const funcName = noSlashes.substring(0, noSlashes.indexOf('('));

      // Get the arguments
      const args = noSlashes.substring(noSlashes.indexOf('(') + 1, noSlashes.indexOf(')')).replace(/\s/g, '').split(',');

      // Set up output string
      javaDocStr += `${this.desc}${funcName}\n`;

      // Add args to output
      args.forEach(arg => javaDocStr += `${paramString}${arg}\n`);

      // Display output
      this.output = javaDocStr;
    } else {
      // Reset
      this.output = '';
    }
  }
}
