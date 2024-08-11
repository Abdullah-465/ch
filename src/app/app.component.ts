import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calcVal: number = 0;
  funcT: string = 'NoFunction';
  calNumber: string = 'novalue';

  firstNumber: number = 0;
  secondNumber: number = 0;

  onClickValue(value: string, type: string) {
    if (type === 'number') {
      this.onNumberClick(value);
    } else if (type === 'function') {
      if (value === '=') {
        this.onEqualPress();
      } else if (value === 'c') {
        this.clearAll();
      } else {
        this.onFunctionClick(value);
      }
    }
  }

  onNumberClick(value: string) {
    if (this.calNumber !== 'novalue') {
      this.calNumber += value;
    } else {
      this.calNumber = value;
    }
    this.calcVal = parseFloat(this.calNumber);
  }

  onFunctionClick(value: string) {
    if (this.funcT === 'NoFunction') {
      this.firstNumber = this.calcVal;
      this.calNumber = 'novalue';
      this.funcT = value;
    } else {
      this.secondNumber = this.calcVal;
      this.calculateValues();
      this.funcT = value; // Set the new function after calculation
    }
  }

  calculateValues() {
    let result: number;
    switch (this.funcT) {
      case '+':
        result = this.firstNumber + this.secondNumber;
        break;
      case '-':
        result = this.firstNumber - this.secondNumber;
        break;
      case '*':
        result = this.firstNumber * this.secondNumber;
        break;
      case '/':
        if (this.secondNumber === 0) {
          alert('Cannot divide by zero');
          return;
        }
        result = this.firstNumber / this.secondNumber;
        break;
      case '%':
        result = this.firstNumber % this.secondNumber;
        break;
      default:
        console.log('Invalid operation');
        return;
    }
    this.firstNumber = result;
    this.calcVal = result;
    this.calNumber = 'novalue';
  }

  onEqualPress() {
    if (this.funcT !== 'NoFunction') {
      this.secondNumber = this.calcVal;
      this.calculateValues();
      this.funcT = 'NoFunction';
      this.calNumber = 'novalue';
    }
  }

  clearAll() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.funcT = 'NoFunction';
    this.calNumber = 'novalue';
    this.calcVal = 0;
  }
}
