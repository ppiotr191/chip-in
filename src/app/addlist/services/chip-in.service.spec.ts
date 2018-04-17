import { TestBed, inject } from '@angular/core/testing';

import { ChipInService } from './chip-in.service';

describe('ChipInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChipInService]
    });
  });

  it('should be created', inject([ChipInService], (service: ChipInService) => {
    expect(service).toBeTruthy();
  }));

  it('is all ok', inject([ChipInService], (service: ChipInService) => {
    var personList = [
      {name : "Stefan", price: 18, haveToPay : 18},
      {name : "Czarek", price: 18, haveToPay : 18}];
    var resultList = service.count(personList);

    expect(resultList).toEqual([]);
  }));

  it('second person lend money', inject([ChipInService], (service: ChipInService) => {
    var personList = [
      {id : 1, name : "Stefan", price: 36, haveToPay : 18},
      {id : 2, name : "Czarek", price: 0, haveToPay : 18}];
    var resultList = service.count(personList);

    expect(resultList).toEqual([
        {personID : 2, type : "lend", toPerson : 1, amount : 18}
    ]);
  }));

  it('first person lend money', inject([ChipInService], (service: ChipInService) => {
    var personList = [
      {id : 1, name : "Stefan", price: 0, haveToPay : 18},
      {id : 2, name : "Czarek", price: 36, haveToPay : 18}];
    var resultList = service.count(personList);

    expect(resultList).toEqual([
        {personID : 1, type : "lend", toPerson : 2, amount : 18}
    ]);
  }));
  
  it('3 person, 2 payer', inject([ChipInService], (service: ChipInService) => {
    var personList = [
      {id : 1, name : "Stefan", price: 20, haveToPay : 100},
      {id : 2, name : "Jessi", price: 160, haveToPay : 100},
      {id : 3, name : "Czarek", price: 120, haveToPay : 100}
    ];
    var resultList = service.count(personList);
    expect(resultList).toEqual([
        {personID : 1, type : "lend", toPerson : 2, amount : 60},
        {personID : 1, type : "lend", toPerson : 3, amount : 20}
    ]);
  }));

  it('3 person, 1 payer', inject([ChipInService], (service: ChipInService) => {
    var personList = [
      {id : 1, name : "Stefan", price: 220, haveToPay : 100},
      {id : 2, name : "Jessi", price: 40, haveToPay : 100},
      {id : 3, name : "Czarek", price: 40, haveToPay : 100},
    ];
    var resultList = service.count(personList);
    expect(resultList).toEqual([
        {personID : 2, type : "lend", toPerson : 1, amount : 60},
        {personID : 3, type : "lend", toPerson : 1, amount : 60}
    ]);
  })); 

  it('1 payer, 2 borrower with other amount of cash', inject([ChipInService], (service: ChipInService) => {
    var personList = [
      {id : 1, name : "T1", price: 100, haveToPay : 50},
      {id : 2, name : "T2", price: 0, haveToPay : 20},
      {id : 3, name : "T3", price: 0, haveToPay : 30},
    ];
    var resultList = service.count(personList);
    console.log(resultList);
    expect(resultList).toEqual([
        {personID : 2, type : "lend", toPerson : 1, amount : 20},
        {personID : 3, type : "lend", toPerson : 1, amount : 30}
    ]);
  }));
});
