import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FunkosModule } from './funkos/funkos.module';
import { SeriesModule } from './series/series.module';
import { AuthModule } from './auth/auth.module';

import { AuthService } from './services/auth.service';
import { SharedService } from './shared/shared.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FunkosModule,
    AuthModule,
    SeriesModule
  ],
  providers: [
    AuthService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
