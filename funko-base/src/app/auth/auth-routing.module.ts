import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { SignOutComponent } from './sign-out/sign-out.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthComponent, children: [
            { path: '', component: SignInComponent },
            // { path: 'sign-up', component: SignUpComponent },
            // { path: 'sign-out', component: SignOutComponent}
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
