import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
export const firebaseconfig = {
    apiKey: "AIzaSyCkmKLYYpqXVizWvU2cmDw24hp8DDbF4RA",
    authDomain: "marmitascassia.firebaseapp.com",
    databaseURL: "https://marmitascassia.firebaseio.com",
    storageBucket: "marmitascassia.appspot.com",
    messagingSenderId: "933582000572"
  };
import { ProductsListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseconfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
