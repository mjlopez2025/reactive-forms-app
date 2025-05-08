import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";


export const authRoutes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'registro',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'registro',
      }
    ],
  },
]

export default authRoutes;
