import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { MeasurePlanComponent } from "./components/measure-plan/measure-plan.component";
import { ToDoListComponent } from "./components/to-do-list/to-do-list.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { DutyCheckComponent } from "./components/duty-check/duty-check.component";
import { LoginComponent } from "./components/login/login.component";
import {TimeTableYearComponent} from "./components/time-table-year/time-table-year.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'measure-plan', component: MeasurePlanComponent },
  { path: 'to-do-list', component: ToDoListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'duty-check', component: DutyCheckComponent },
  { path: 'login', component: LoginComponent },
  { path: 'time-table-year', component: TimeTableYearComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
