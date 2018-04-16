import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddlistComponent } from './addlist/addlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipInService } from './addlist/services/chip-in.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        AddlistComponent
      ],
      imports: [
        FormsModule, ReactiveFormsModule
      ],
      providers : [
        ChipInService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
