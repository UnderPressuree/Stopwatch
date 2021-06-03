import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import {Observable} from 'rxjs';
import {timeInterval} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild('waitButton', {static: true}) button: ElementRef;
  public waitButtonSubscription: Subscription;
  public source: Observable<number> = timer(0, 1000);
  public subscriber: Subscription;
  public time = 0;

  public startTimer(): void {
    this.subscriber = this.source.subscribe(() => {
      this.time += 1;
    });
    }

  public stopTimer(): void {
    this._stopTimerSubscription();
    this.time = 0;
  }

  public resetTimer(): void {
    this.time = 0;
    this._stopTimerSubscription();
    this.startTimer();
  }

  public wait(): void {
    if (!this.waitButtonSubscription) {
      this.waitButtonSubscription = fromEvent(this.button.nativeElement, 'click').pipe(
        timeInterval(),
      ).subscribe(i => {
        console.log('Interval: ', i.interval);
        if (i.interval <= 300 && this.subscriber) {
          this._stopTimerSubscription();
        }
      });
    }
  }

  private _stopTimerSubscription(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
      this.subscriber = null;
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    this.waitButtonSubscription.unsubscribe();
  }
}
