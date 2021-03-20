import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private userMenuOpen: Boolean;
  
  constructor(
    private authService: AuthentificationService,
    public translate: TranslateService,
    private menu: MenuController) { 
      this.userMenuOpen = false;
  }

  ngOnInit() {}

  public openFirst() {
    this.menu.enable(true, 'main-menu');
    this.menu.open('main-menu');
  }

  public toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  public signOut() : void {
    this.authService.signOut();
  }

  public onEnglish() {
    this.translate.use('en');
  }
  
  public onFrench() {
    this.translate.use('fr');
  }
  public onClose() {
    this.userMenuOpen = false;
  }
}
