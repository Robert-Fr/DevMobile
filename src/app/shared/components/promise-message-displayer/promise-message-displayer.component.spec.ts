import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromiseMessageDisplayerComponent } from './promise-message-displayer.component';

describe('PromiseMessageDisplayerComponent', () => {
  let component: PromiseMessageDisplayerComponent;
  let fixture: ComponentFixture<PromiseMessageDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromiseMessageDisplayerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromiseMessageDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
