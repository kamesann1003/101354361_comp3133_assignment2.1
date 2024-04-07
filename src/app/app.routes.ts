import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from './network/authguard.service';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule, HttpClient,  provideHttpClient } from '@angular/common/http';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'main', component: MainComponent },
    { path: 'view/:id', component: ViewComponent },
    { path: 'create', component: CreateComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule],

    providers: [
        
      ],
})

export class AppRoutingModule {}
