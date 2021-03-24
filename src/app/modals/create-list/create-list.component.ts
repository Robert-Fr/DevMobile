import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';
import { pluck, reduce, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  newListForm: FormGroup;

  constructor(private modalController: ModalController, 
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private translateService: TranslateService,
    private listService: ListService,
    private userService: UserService,
    private authService : AuthentificationService) {
   
  }

  ngOnInit(){
    this.newListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      emailAuthorized: ['', Validators.email],
      radioSettings: [this.translateService.instant('modals.list.radioWrite'), [Validators.required]]
   })
  }

  dismissModal() {
      this.modalController.dismiss(); 
  }

  async presentToastSharingSucess() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('modals.list.toastSharingSucess'),
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async presentToastSucess() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('modals.list.toastSucess'),
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('modals.list.toastError'),
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  async createNewList(){
    if(this.newListForm.valid){
      const email = this.newListForm.get('emailAuthorized').value;
      if (email) {
        const Observable = this.userService.getUserMail(email).pipe(
          pluck(0,'email'),
        )
        Observable.subscribe({
          next: async email => {
            if (!email) {
              await this.presentToastError()
            } else { 
              const list = new List(this.newListForm.get('name').value,this.authService.user.value.email)
              if (this.newListForm.get('radioSettings').value === this.translateService.instant('modals.list.radioWrite')) {
                list.writers.push(email)
                console.log(email);
              } else if (this.newListForm.get('radioSettings').value === this.translateService.instant('modals.list.radioRead')) {
                list.readers.push(email)
                console.log(email);
              }
              this.listService.create(list)
              await this.presentToastSharingSucess()    
              this.dismissModal()
            }
          }
        })
      } else {
        this.listService.create(new List(this.newListForm.get('name').value,this.authService.user.value.email))
        await this.presentToastSucess()
        this.dismissModal()
      }
    }
  }

  get errorControl() {
    return this.newListForm.controls;
  }

}
