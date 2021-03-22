import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard,canActivate,emailVerified } from '@angular/fire/auth-guard';
import { redirectAuthorizedToHome, redirectUnauthorizedToLogin } from './services/authentification.service';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardGuard] 
  },
  {
    path: 'list-details/:listId',
    loadChildren: () => import('./pages/list-details/list-details.module').then( m => m.ListDetailsPageModule),
    canActivate: [AuthGuardGuard] 
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
