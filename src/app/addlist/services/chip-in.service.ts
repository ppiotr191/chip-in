import { Injectable } from '@angular/core';

@Injectable()
export class ChipInService {

  constructor() { }

  filterResultList(resultList){
    return resultList.filter((result) => {
        return (result.amount > 0);
    });
  }

  count(personList){
    var resultList = [];
    var payerList = [];
    var borrowerList = [];
    personList.forEach(function(person){
      if (person.price > person.haveToPay){
        payerList.push({person : person, priceTmp : person.price - person.haveToPay})
      }
      else if (person.price < person.haveToPay){
        borrowerList.push({person : person, haveToPayTmp : person.haveToPay - person.price});
      }
    });
    payerList.map((payer) => {      
      borrowerList.map((borrower) => {
        let price = payer.priceTmp - borrower.haveToPayTmp;
        if (price > 0){
           let partialPrice = payer.priceTmp - price;
           payer.priceTmp = price;
           resultList.push({personID : borrower.person.id, type : 'lend', toPerson : payer.person.id, amount : borrower.haveToPayTmp})
           borrower.haveToPayTmp = 0; 
        }
        else if (price <= 0){
          let partialPrice = payer.priceTmp;
          resultList.push({personID : borrower.person.id, type : 'lend', toPerson : payer.person.id, amount : partialPrice})
          borrower.haveToPayTmp -= partialPrice;
          payer.priceTmp = 0;

        }
      })
    })
    resultList = this.filterResultList(resultList);
    return resultList;
  }
}
