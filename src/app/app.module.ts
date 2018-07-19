/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slides } from 'ionic-angular';
import { HttpModule } from '@angular/http';

/* Native */
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

/* App */
import { MyApp } from './app.component';

/* Pages */
import { LoginPage } from '../pages/login/login';
import { RegisterPersonPage } from '../pages/register-person/register-person';
import { HomePage } from '../pages/home/home'
import { TutorialPage } from '../pages/tutorial/tutorial'
import { MedicalResultsPage } from '../pages/medical-results/medical-results'
import { DashboardResultsPage } from '../pages/dashboard-results/dashboard-results'

/* Services */
import { AuthService } from '../services/authService'
import { UserInfoService } from '../services/userInfoService'
import { PatientService } from '../services/patientService'

/* Natives */
import { IonicStorageModule } from '@ionic/storage';

/* External */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrMaskerModule } from 'brmasker-ionic-3';

/* Components */
<<<<<<< HEAD
import { DashboardFilterComponent } from '../components/dashboard-filter/dashboard-filter'
import { ImportPatientComponent } from '../components/import-patient/import-patient'
import { SplashPage } from '../pages/splash/splash';
=======
import { DashboardFilterComponent } from '../components/dashboard-filter/dashboard-filter';
import { ImportPatientComponent } from '../components/import-patient/import-patient';
import { TextsConfigComponent } from '../components/texts-config/texts-config'
>>>>>>> 1628a3b50359a43491805592dd71f033c9140762

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TutorialPage,
    MedicalResultsPage,
    RegisterPersonPage,
    DashboardFilterComponent,
    ImportPatientComponent,
<<<<<<< HEAD
    DashboardResultsPage,
    SplashPage
=======
    TextsConfigComponent,
    DashboardResultsPage
>>>>>>> 1628a3b50359a43491805592dd71f033c9140762
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    BrMaskerModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp), 
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    TutorialPage,
    MedicalResultsPage,
    RegisterPersonPage,
    DashboardResultsPage,
    ImportPatientComponent,
<<<<<<< HEAD
    DashboardFilterComponent,
    SplashPage
=======
    TextsConfigComponent,
    DashboardFilterComponent
>>>>>>> 1628a3b50359a43491805592dd71f033c9140762
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Slides,
    UserInfoService,
    PatientService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
