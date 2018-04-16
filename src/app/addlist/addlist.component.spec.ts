import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddlistComponent } from './addlist.component';
import { Person } from '../mapped_classes/person';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipInService } from './services/chip-in.service';

describe('AddlistComponent', () => {
  let component: AddlistComponent;
  let fixture: ComponentFixture<AddlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule, ReactiveFormsModule],
      declarations: [ AddlistComponent ],
      providers : [ ChipInService ]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AddlistComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to person list', () =>{
      component.addToPersonList("James", 100, 50);
      expect(component.personList).toEqual([{id : 1, name : "James", price : 100, haveToPay : 50}]);
  });

  it('should clear list', () => {
    component.addToPersonList("Jessi", 120, 50);
    component.clear();
    expect(component.personList).toEqual([]);    
  });
  
  it('get name by id', () => {
    component.clear();
    component.addToPersonList("Jessi", 120, 50);
    component.addToPersonList("Czarek", 120, 50);    
    let name = component.getNameByID(2);
    console.log(name);
    expect(name).toBe("Czarek");
  });
});
