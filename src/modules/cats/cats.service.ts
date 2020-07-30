import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(age:Number){
    console.log('INIT findOne****', age, this.cats);
    var selectedCat = this.cats.filter((cat)=>{
      return cat.age == age;
    });
    return selectedCat;
  }
}