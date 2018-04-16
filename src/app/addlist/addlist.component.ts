import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Person } from '../mapped_classes/person';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ChipInService} from './services/chip-in.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {
  form: FormGroup;
  items: FormArray;
  nextId: number = 1;
  personList: Person[] = [];
  resultList : any = [];
  target : any;
  finish : Observable<string>;
  canScrollDown : boolean = false;
  messageIsShown : boolean = false;

  getNameByID(id: number): any {
    let person:Person =  this.personList.filter(function(person){
        if (person.id === id){
            return person;
        }
    })[0];
    return person.name; 
  }

  addToPersonList(name: string, price: number, haveToPay : number): void {
    let person:Person = {
        id : this.nextId,
        name : name,
        price : price,
        haveToPay : haveToPay
    }
    this.personList.push(person);
    this.nextId +=1;
  }

  createPersonList(): void {
    this.clear();
    this.items.value.forEach((element) => {
      this.addToPersonList(element.name, element.price, element.haveToPay);
    })
  }

  clear(): void {
      this.personList = [];
      this.nextId = 1;
  }

  submit(element) : void{
    if (!this.form.valid){
      this.messageIsShown = true;
      return;
    }
    this.messageIsShown = false;
    this.finish = new Observable( () => {
      element.scrollIntoView({behavior:"smooth"});
    });

    this.createPersonList();
    this.count();
    this.finish.subscribe();
  }

  count(): any {
      this.resultList = this.chipInService.count(this.personList);
  }

  constructor(private fb: FormBuilder, private chipInService: ChipInService) { }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      haveToPay: ['', Validators.required]
    });
  }

  removeItem(index:number) : void {
    this.items.removeAt(index);
  }

  addItem(): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  ngOnInit() {
    this.form = this.fb.group({
      items : this.fb.array([ this.createItem() ])
    });
    this.items = this.form.get('items') as FormArray;
  }

  public ngAfterViewChecked(): void {
      if (this.finish){
        this.finish.subscribe();
      }
  }       

}
