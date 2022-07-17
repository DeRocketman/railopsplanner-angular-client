import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import { HomeComponent } from './components/home/home.component';
import { MeasurePlanComponent } from './components/measure-plan/measure-plan.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import {MatListModule} from "@angular/material/list";
import { SettingsComponent } from './components/settings/settings.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DutyCheckComponent } from './components/duty-check/duty-check.component';
import {MatCardModule} from "@angular/material/card";
import { MeasureFormComponent } from './components/measure-form/measure-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { TimeTableYearListComponent } from './components/time-table-year/time-table-year-list/time-table-year-list.component';
import { TimeTableYearListItemComponent } from './components/time-table-year/time-table-year-list-item/time-table-year-list-item.component';
import { TimeTableYearEditComponent } from './components/time-table-year/time-table-year-edit/time-table-year-edit.component';
import { TimeTableYearCreateComponent } from './components/time-table-year/time-table-year-create/time-table-year-create.component';
import { TimeTableYearFormComponent } from './components/time-table-year/time-table-year-form/time-table-year-form.component';
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { StatisticComponent } from './components/statistic/statistic.component';
import { RailNetworkFormComponent } from './components/rail-network-form/rail-network-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeasurePlanComponent,
    ToDoListComponent,
    SettingsComponent,
    DutyCheckComponent,
    MeasureFormComponent,
    LoginComponent,
    TimeTableYearListComponent,
    TimeTableYearListItemComponent,
    TimeTableYearEditComponent,
    TimeTableYearCreateComponent,
    TimeTableYearFormComponent,
    StatisticComponent,
    RailNetworkFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
