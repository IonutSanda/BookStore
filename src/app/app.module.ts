import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookModule } from './feature-models/books/book.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
// import { ShoppingCartModule } from './feature-models/books/services/popover-services/shopping-cart.module';
import { ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { AuthModule } from '@angular/fire/auth';

import { CoreModule } from './core/core.module';
import { ShoppingCartModule } from './feature-models/shopping-cart/shopping-cart.module';
import { ProfileComponent } from './feature-models/auth/components/profile/profile.component';
import { LoggedInGuard } from './feature-models/auth/services/guards/loggedIn.guard/logged-in.guard';
import { AuthGuard } from './feature-models/auth/services/guards/auth.guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BookModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingCartModule,
    AuthModule,
    ModalModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService, BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
