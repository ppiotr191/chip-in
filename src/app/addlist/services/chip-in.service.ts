import { Injectable } from '@angular/core';

@Injectable()
export class ChipInService {

  constructor() { }

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
           payer.priceTmp = partialPrice;
           resultList.push({personID : borrower.person.id, type : 'lend', toPerson : payer.person.id, amount : partialPrice})
           borrower.haveToPayTmp -= partialPrice; 
        }
        else if (price <= 0){
          let partialPrice = payer.priceTmp;
          resultList.push({personID : borrower.person.id, type : 'lend', toPerson : payer.person.id, amount : partialPrice})
          borrower.haveToPayTmp -= partialPrice;
          payer.priceTmp = 0;

        }
      })
    })

    return resultList;
  }
}
