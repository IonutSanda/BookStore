import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SvgTemplateComponent } from 'src/app/shared/components/templates/svg-template/svg-template.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SvgTemplateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule
  ]
})
export class AuthModule { }
