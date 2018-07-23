/* Angular */
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';

/* Views */
import { TutorialPage } from '../../pages/tutorial/tutorial'
import { MedicalResultsPage } from '../../pages/medical-results/medical-results'
import { DashboardResultsPage } from '../../pages/dashboard-results/dashboard-results'

/* Components */ 
import { TextsConfigComponent } from '../../components/texts-config/texts-config'

/* Native */
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'home.html',
})



export class HomePage {

  constructor(public navCtrl: NavController,
              private modalController : ModalController,
              private storage : Storage              
            ) {

              this.storage.get('text1').then((data)=>{ 
                if(!data){
                  this.storage.set("text1",`
                  O valor de Hemoglobina Glicada reportada acima é uma transcrição do valor obtido pelo sistema A1cNow* e reportado em xx/xx/xx as hh:mm. Foi sugerido pelo profissional de saude que este exame (Hemoglobina Glicada) se repita em data próxima a XX/XX/XX. Deseja adicionar este compromisso ao calendário?
                   
                          `);
                }
              });

              this.storage.get('text2').then((data)=>{        
                if(!data){
                  this.storage.set("text2",`
      * A1Cnow é um sistema patenteado para quantificação de Hemoglobina Glicada em sangue capilar. O sistema é calibrado de acordo com padrões internacionais (IFCC e NGSP).
              `);
                }
              });
            
              this.storage.get('text3').then((data)=>{        
                if(!data){
                  this.storage.set("text3",`Os valores de referência da hemoglobina glicada são diferentes se o paciente é ou não diabético. Para alguém que não seja diabético os níveis normais podem variar de 4,5 a 5,6%. Um resultado entre 5,7 e 6,4% é considerado como pré-diabetes. Níveis superiores a 6,5%, obtidos em dois testes separados, indicam diabetes mellitius. Para pessoas que sejam diabéticas, níveis de hemoglobina Glicada entre 6,5 e 7,0% são considerados como um indicativo de um bom controle da doença. Fonte: ANAD
                  `);
                }
              });
      
  }

  ionViewDidLoad() {
   
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
