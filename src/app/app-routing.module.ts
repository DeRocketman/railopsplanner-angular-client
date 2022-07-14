import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { MeasurePlanComponent } from "./components/measure-plan/measure-plan.component";
import { ToDoListComponent } from "./components/to-do-list/to-do-list.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { DutyCheckComponent } from "./components/duty-check/duty-check.component";
import { LoginComponent } from "./components/login/login.component";

import {
  TimeTableYearEditComponent
} from "./components/time-table-year/time-table-year-edit/time-table-year-edit.component";
import {
  TimeTableYearCreateComponent
} from "./components/time-table-year/time-table-year-create/time-table-year-create.component";
import {
  TimeTableYearListComponent
} from "./components/time-table-year/time-table-year-list/time-table-year-list.component";
import {AuthGuard} from "./services/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'measure-plan', component: MeasurePlanComponent, canActivate:[AuthGuard] },
  { path: 'to-do-list', component: ToDoListComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  { path: 'duty-check', component: DutyCheckComponent, canActivate:[AuthGuard] },
  { path: 'time-table-year', component: TimeTableYearListComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/create', component: TimeTableYearCreateComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/edit/:id', component: TimeTableYearEditComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
