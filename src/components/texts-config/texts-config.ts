/* Angular */
import { Component, Input } from '@angular/core';
import { NavController, 
        LoadingController, 
        AlertController, 
        ModalController,
        ToastController, 
        ViewController,
        Events } from 'ionic-angular';

/* Native */
import { Storage } from '@ionic/storage';

/* Service */ 
import { UserInfoService }  from '../../services/userInfoService'

/* Models */
import { UserInfoTextConfig } from '../../models/userInfoTextConfig'

@Component({
  selector: 'texts-config',
  templateUrl: 'texts-config.html'
})

export class TextsConfigComponent {

  text1 = "";
  text2 = "";
  text3 = "";
  lstTextConfigs : any[] = [];
  lstTextConfigsA1C : any[] = [];
  hasConfigApi : boolean = false;

  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private viewController : ViewController,
    private storage : Storage,
    private alertController : AlertController,
    private userInfoService : UserInfoService,
    private modalController : ModalController, 
    private events : Events) { 

      this.lstTextConfigsA1C = [];

      var textConfig1 = new UserInfoTextConfig();
      var textConfig2 = new UserInfoTextConfig();
      var textConfig3 = new UserInfoTextConfig();
  
      textConfig1.TextType = 1;
      textConfig1.TextConfig = "O valor de Hemoglobina Glicada reportada acima é uma transcrição do valor obtido pelo sistema A1cNow* e reportado em xx/xx/xx as hh:mm. Foi sugerido pelo profissional de saude que este exame (Hemoglobina Glicada) se repita em data próxima a XX/XX/XX. Deseja adicionar este compromisso ao calendário?";
   

      textConfig2.TextType = 2;
      textConfig2.TextConfig = "* A1Cnow é um sistema patenteado para quantificação de Hemoglobina Glicada em sangue capilar. O sistema é calibrado de acordo com padrões internacionais (IFCC e NGSP).";
      

      textConfig3.TextType = 3;
      textConfig3.TextConfig = "Os valores de referência da hemoglobina glicada são diferentes se o paciente é ou não diabético. Para alguém que não seja diabético os níveis normais podem variar de 4,5 a 5,6%. Um resultado entre 5,7 e 6,4% é considerado como pré-diabetes. Níveis superiores a 6,5%, obtidos em dois testes separados, indicam diabetes mellitius. Para pessoas que sejam diabéticas, níveis de hemoglobina Glicada entre 6,5 e 7,0% são considerados como um indicativo de um bom controle da doença. Fonte: ANAD.";
     
  
      this.lstTextConfigsA1C.push(textConfig1);
      this.lstTextConfigsA1C.push(textConfig2);
      this.lstTextConfigsA1C.push(textConfig3);

     

  }

  ionViewDidLoad() {
    this.getUserTextConfig();
  }


  save(){

    let blockUi = this.loadingController.create({
      spinner: 'ios'
    });

    let alert = this.alertController.create({
      buttons: ['Ok']
    });


    blockUi.present();

    return this.userInfoService.saveTextConfig(this.lstTextConfigs).subscribe(result => {
      blockUi.dismiss().then(() => {
        alert.setMessage("Configurações salvas com sucesso!");
        alert.present().then(() => {
          this.getUserTextConfig();
        });
      })
    }, 
    error => {
      blockUi.dismiss().then(() => {
        let stringMessageError = "";

        error.error.forEach(function(value){
          stringMessageError += value + "; <br>";
        });

        stringMessageError = stringMessageError.split(";").join("; \n")
        alert.setMessage(stringMessageError);
        alert.present();
      });
    }
    )
  }

  reset(){
    this.userInfoService.resetUserInfoTextConfig();

    this.lstTextConfigs = this.lstTextConfigsA1C;
    let toast = this.toastController.create({
    message: 'Restauração efetuada com sucesso!',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
     console.log('Dismissed toast');
    });
  
    toast.present();

  }


  cancel(){
    this.viewController.dismiss();
  }

  getUserTextConfig(){
    
    return this.userInfoService.getUserTextConfig().subscribe((result : any []) => {
      if (result.length == 0){
        this.lstTextConfigs=  this.lstTextConfigsA1C.map(x => Object.assign({}, x));          
      } else {
        this.hasConfigApi = true;
        this.lstTextConfigs = result;
      }
    });
  }



  
  

}