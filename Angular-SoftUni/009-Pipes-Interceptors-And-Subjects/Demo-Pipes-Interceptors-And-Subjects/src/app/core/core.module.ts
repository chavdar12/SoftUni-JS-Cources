import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {ErrorHandlerInterceptor} from './error-handler.interceptor';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Inject(HTTP_INTERCEPTORS) private interceptors: HttpInterceptor[]) {
    // console.log(interceptors);
    // for( const interceptor of this.interceptors){
    //   interceptor.intercept();
    // }
  }
}
