import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AmaterialModule } from './material/amaterial.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { spinnerInterceptor } from './shared/services/interceptors/spinner.interceptor';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AmaterialModule,
    NgChartsModule,
   
    
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    {provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor, multi: true},
    // {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
