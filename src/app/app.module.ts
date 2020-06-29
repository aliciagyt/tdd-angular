import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomesComponent } from './homes/homes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { BookComponent } from './book/book.component'
import { FormsModule} from '@angular/forms'
import {MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomesComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  entryComponents: [
    BookComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
