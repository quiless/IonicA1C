/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slides } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient, HttpClientModule  } from '@angular/common/http';

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
import { MedicalResultService } from '../services/medicalResultService'
import { TokenInterceptor } from '../services/interceptorService'

/* Natives */
import { IonicStorageModule } from '@ionic/storage';

/* External */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrMaskerModule } from 'brmasker-ionic-3';

/* Components */
import { DashboardFilterComponent } from '../components/dashboard-filter/dashboard-filter'
import { ImportPatientComponent } from '../components/import-patient/import-patient'
import { TextsConfigComponent } from '../components/texts-config/texts-config';
import { OfflineDbProvider } from '../providers/offlineDbProvider';
import { OfflineDbSyncProvider } from '../providers/offlineDbSyncProvider';
import { Network } from '@ionic-native/network';


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
    DashboardResultsPage,
    TextsConfigComponent
    
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      preloadModules: true
    }),
    BrowserModule,
    HttpClientModule ,
    NgxDatatableModule,
    BrMaskerModule,
    IonicStorageModule.forRoot({name:'__a1cNowDb'}),
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
    DashboardFilterComponent,
    TextsConfigComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    HttpClient,
    Slides,
    UserInfoService,
    MedicalResultService,
    PatientService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    OfflineDbProvider,
    OfflineDbSyncProvider,
    Network
  ]
})
export class AppModule {}

