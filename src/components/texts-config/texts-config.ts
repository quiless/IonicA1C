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


@Component({
  selector: 'texts-config',
  templateUrl: 'texts-config.html'
})

export class TextsConfigComponent {

  text1 = "";
  text2 = "";
  text3 = "";


  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private viewController : ViewController,
    private storage : Storage,
    private modalController : ModalController, 
    private events : Events) { 
      this.getTexts();
  }

  getTexts(){
    this.storage.get('text1').then((data)=>{        
      this.text1 = data;
    });
    
    this.storage.get('text2').then((data)=>{        
      this.text2 = data;
    });

    this.storage.get('text3').then((data)=>{        
      this.text3 = data;
    });
  }
  save(){
    this.storage.set("text2", this.text2).then(() => {
      this.storage.set("text2", this.text2).then(() => {
        this.storage.set("text3", this.text3).then(() => { 
         this.viewController.dismiss();
        })
      });
    });  
  }

  reset(){
    this.getTexts();
    this.storage.set("text1",`
O valor de Hemoglobina Glicada reportada acima é uma transcrição do valor obtido pelo sistema A1cNow* e reportado em xx/xx/xx as hh:mm. Foi sugerido pelo profissional de saude que este exame (Hemoglobina Glicada) se repita em data próxima a XX/XX/XX. Deseja adicionar este compromisso ao calendário?
      `).then(()=>{
        this.storage.set("text2",`
      * A1Cnow é um sistema patenteado para quantificação de Hemoglobina Glicada em sangue capilar. O sistema é calibrado de acordo com padrões internacionais (IFCC e NGSP).
            `).then(()=>{

              this.storage.set("text3",`Os valores de referência da hemoglobina glicada são diferentes se o paciente é ou não diabético. Para alguém que não seja diabético os níveis normais podem variar de 4,5 a 5,6%. Um resultado entre 5,7 e 6,4% é considerado como pré-diabetes. Níveis superiores a 6,5%, obtidos em dois testes separados, indicam diabetes mellitius. Para pessoas que sejam diabéticas, níveis de hemoglobina Glicada entre 6,5 e 7,0% são considerados como um indicativo de um bom controle da doença. Fonte: ANAD
              `).then(()=>{

                let toast = this.toastController.create({
                  message: 'Restauração efetuada com sucesso!',
                  duration: 3000,
                  position: 'top'
                });
              
                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });
              
                toast.present();
                
                this.getTexts();
              });
            });
      });  
  }

  cancel(){
    this.viewController.dismiss();
  }



  
  

}