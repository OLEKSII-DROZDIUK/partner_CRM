//hammer
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
	  swipe: { direction: hammer.DIRECTION_HORIZONTAL },
	  pinch: { enable: false },
	  rotate: { enable: false }
	};
}
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }        from '@angular/forms';
// helpers
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor }  from './helpers/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
//component
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HammerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
			provide: HAMMER_GESTURE_CONFIG,
			useClass: MyHammerConfig
		},

    // provider used to create fake backend
    // fakeBackendProvider
	],
  bootstrap: [
		AppComponent,
	]
})
export class AppModule { }
