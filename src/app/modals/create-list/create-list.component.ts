import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';
import { pluck, tap } from 'rxjs/operators';
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
      radioSettings: [this.translateService.instant('modal.list.radioWrite'), [Validators.required]]
   })
  }

  dismissModal() {
      this.modalController.dismiss(); 
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
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
              await this.presentToast()
            } else { 
              const list = new List(this.newListForm.get('name').value,this.authService.user.value.email)
              if (this.newListForm.get('radioSettings').value === this.translateService.instant('modal.list.radioWrite')) {
                list.writers.push(email)
              } else if (this.newListForm.get('radioSettings').value === this.translateService.instant('modal.list.radioRead')) {
                list.readers.push(email)
              }
              this.listService.create(list);              
              this.dismissModal()
            }
          }
        })
      } else {
        this.listService.create(new List(this.newListForm.get('name').value,this.authService.user.value.email))
        this.dismissModal()
      }
    }
  }

  get errorControl() {
    return this.newListForm.controls;
  }

}
