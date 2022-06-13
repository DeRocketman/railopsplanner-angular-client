import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { MeasurePlanComponent } from "./components/measure-plan/measure-plan.component";
import { ToDoListComponent } from "./components/to-do-list/to-do-list.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { DutyCheckComponent } from "./components/duty-check/duty-check.component";
import { LoginComponent } from "./components/login/login.component";
import {TimeTableYearListComponent} from "./components/time-table-year/time-table-year-list/time-table-year-list.component";
import {
  TimeTableYearEditComponent
} from "./components/time-table-year/time-table-year-edit/time-table-year-edit.component";
import {
  TimeTableYearCreateComponent
} from "./components/time-table-year/time-table-year-create/time-table-year-create.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'measure-plan', component: MeasurePlanComponent },
  { path: 'to-do-list', component: ToDoListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'duty-check', component: DutyCheckComponent },
  { path: 'login', component: LoginComponent },
  { path: 'time-table-year', component: TimeTableYearListComponent},
  { path: 'time-table-year/create', component: TimeTableYearCreateComponent},
  { path: 'time-table-year/edit/:id', component: TimeTableYearEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
