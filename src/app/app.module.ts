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
import { TimeTableYearComponent } from './components/time-table-year/time-table-year.component';

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
    TimeTableYearComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
