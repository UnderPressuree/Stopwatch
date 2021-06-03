import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
  transform(value: number): string {
    const hrs = this.transformStringOutput(Math.floor(value / 3600));
    const mins = this.transformStringOutput(Math.floor(value % 3600 / 60));
    const secs = this.transformStringOutput(Math.floor(value % 3600 % 60));
    return `${hrs}:${mins}:${secs}`;
  }

  private transformStringOutput(value: number): string {
    return (value >= 10) ? value.toString() : '0' + value;
  }
}
