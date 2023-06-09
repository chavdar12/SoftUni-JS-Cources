import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private activeUsers!: Promise<number>;

  private activeUsers$!: Observable<number>;

  private subscribtion!: Subscription;

  constructor(private titleService: Title) {
  }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('Home Page');

    // const xhr = new XMLHttpRequest();
    // xhr.addEventListener('load', function () {
    //   const xhr1 = new XMLHttpRequest();
    //   xhr1.addEventListener('load', function () {
    //     const xhr3 = new XMLHttpRequest();
    //     xhr3.addEventListener('load', function () {
    //     });
    //   });
    // });

    // const r1 = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.addEventListener('load', function () {
    //     resolve(this.responseText);
    //   })
    // });

    // const r2 = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.addEventListener('load', function () {
    //     resolve(this.responseText);
    //   })
    // })
    // const r3 = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.addEventListener('load', function () {
    //     resolve(this.responseText);
    //   })
    // })

    this.activeUsers = new Promise<number>((resolve) => {
      // Problem 3: Promises do not work with streams.
      //   setInterval(() => {
      setTimeout(() => {
        const activeUsers = Math.round(Math.random() * 100);

        console.log('resolve', activeUsers);
        resolve(activeUsers);
      }, 2000)
      //   }, 4000);
    });

    // // Problem 1: Promises are executed immediately.
    // this.activeUsers
    //   .then(activeUsers => {
    //     console.log('activeUsers', activeUsers);
    //   });

    this.subscribtion = new Observable((observer) => {
      let timer: any;
      const intervalTimer = setInterval(() => {
        timer = setTimeout(() => {
          const activeUsers = Math.round(Math.random() * 100);

          console.log('next', activeUsers);
          observer.next(activeUsers);
          // observer.error();
          // observer.complete();
        }, 2000);
      }, 4000);

      return () => {
        console.log('cleanup on time');
        clearTimeout(timer);
        clearTimeout(intervalTimer);
      }
    }).subscribe(activeUsers => {
      console.log('activeUsers$', activeUsers);
    })
    // .subscribe({
    //  // for new data:
    //   next: activeUsers => {
    //     console.log('activeUsers$', activeUsers);
    //   },
    //   complete: () => {

    //   },
    //   error: (err) => {
    //     console.log()
    //   }
    // })
  }

  ngOnDestroy(): void {
    // Problem 2: Promises cannnot be canceled.
    console.log('No longer in need of active users!');
    this.subscribtion.unsubscribe();
  }
}
