import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthComponent, children: [
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-out', component: SignOutComponent },
            { path: 'sign-up', component: SignUpComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
