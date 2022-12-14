import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { MeasurePlanComponent } from "./components/measure/measure-plan/measure-plan.component";
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
import {StatisticComponent} from "./components/statistic/statistic.component";
import {RailNetworkFormComponent} from "./components/rail-network-form/rail-network-form.component";
import {TrackCreateComponent} from "./components/infrastructure/track-create/track-create.component";
import {InfrastructureComponent} from "./components/infrastructure/infrastructure/infrastructure.component";
import {StationCreateComponent} from "./components/infrastructure/station-create/station-create.component";
import {MeasureEditComponent} from "./components/measure/measure-edit/measure-edit.component";
import {MeasureCreateComponent} from "./components/measure/measure-create/measure-create.component";
import {SignupComponent} from "./components/signup/signup.component";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'measure-plan', component: MeasurePlanComponent, canActivate:[AuthGuard] },
  { path: 'measure-plan/create', component: MeasureCreateComponent, canActivate:[AuthGuard] },
  { path: 'measure-plan/edit/:id', component: MeasureEditComponent, canActivate:[AuthGuard] },
  { path: 'to-do-list', component: ToDoListComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  { path: 'duty-check', component: DutyCheckComponent, canActivate:[AuthGuard] },
  { path: 'statistic', component: StatisticComponent, canActivate:[AuthGuard] },
  { path: 'infrastructure', component: InfrastructureComponent, canActivate:[AuthGuard] },
  { path: 'infrastructure/create/track', component: TrackCreateComponent, canActivate:[AuthGuard] },
  { path: 'infrastructure/create/station', component: StationCreateComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year', component: TimeTableYearListComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/create', component: TimeTableYearCreateComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/edit/:id', component: TimeTableYearEditComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/edit-rail-network/:id', component: RailNetworkFormComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/edit-rail-network/:id/create-track', component: TrackCreateComponent, canActivate:[AuthGuard]},
  { path: 'time-table-year/edit-rail-network/:id/edit-track/:id', component: TrackCreateComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
