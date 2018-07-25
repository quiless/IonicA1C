/* Angular */
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController, Events, ToastController } from 'ionic-angular';

/* Views */
import { TutorialPage } from '../../pages/tutorial/tutorial'
import { MedicalResultsPage } from '../../pages/medical-results/medical-results'
import { DashboardResultsPage } from '../../pages/dashboard-results/dashboard-results'

/* Components */ 
import { TextsConfigComponent } from '../../components/texts-config/texts-config'

/* Native */
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/authService';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'home.html',
})



export class HomePage {

  constructor(public navCtrl: NavController,
              private modalController : ModalController,
              private storage : Storage,
              public authService: AuthService,
              public events: Events,
              private toastCtrl: ToastController
            ) {

              this.storage.get('text1').then((data)=>{ 
                if(!data){
                  this.storage.set("text1",`O valor de Hemoglobina Glicada reportada acima é uma transcrição do valor obtido pelo sistema A1cNow* e reportado em %DataExame% as %HoraExame%. Foi sugerido pelo profissional de saude que este exame (Hemoglobina Glicada) se repita em data próxima a %DataProxima%. Deseja adicionar este compromisso ao calendário?`);
                }
              });

              this.storage.get('text2').then((data)=>{        
                if(!data){
                  this.storage.set("text2",`* A1Cnow é um sistema patenteado para quantificação de Hemoglobina Glicada em sangue capilar. O sistema é calibrado de acordo com padrões internacionais (IFCC e NGSP).`);
                }
              });
            
              this.storage.get('text3').then((data)=>{        
                if(!data){
                  this.storage.set("text3",`Os valores de referência da hemoglobina glicada são diferentes se o paciente é ou não diabético. Para alguém que não seja diabético os níveis normais podem variar de 4,5 a 5,6%. Um resultado entre 5,7 e 6,4% é considerado como pré-diabetes. Níveis superiores a 6,5%, obtidos em dois testes separados, indicam diabetes mellitius. Para pessoas que sejam diabéticas, níveis de hemoglobina Glicada entre 6,5 e 7,0% são considerados como um indicativo de um bom controle da doença. Fonte: ANAD`);
                }
              });     

              events.subscribe('logout', () => {
                // user and time are the same arguments passed in `events.publish(user, time)`
                let toast = this.toastCtrl.create({
                  message: 'Oops! Você precisa reconectar para fazer essa operação!',
                  duration: 3000,
                  position: 'top'
                });
              
              
                toast.present();
                this.navCtrl.setRoot(LoginPage);
              });
  }

  ionViewCanEnter(){
    this.authService.userIsLogged().then(x=>{
      if(!x)
        this.navCtrl.setRoot(LoginPage);
    });   
  }

  showTextsConfigModal(){
    this.navCtrl.push(TextsConfigComponent);
  }

  
  redirectTutorialPage(){
    this.navCtrl.push(TutorialPage);
  }

  redirectMedicalResultsPage(){
    this.navCtrl.push(MedicalResultsPage);
  }

  redirectDashboardResultsPage(){
    this.navCtrl.push(DashboardResultsPage);
  }
}
