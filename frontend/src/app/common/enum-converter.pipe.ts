import { Pipe, PipeTransform } from '@angular/core';
import {UNIT_LIST} from "./unit";

@Pipe({name: 'enums'})
export class EnumConverterPipe implements PipeTransform {

  enums = [
    ...UNIT_LIST
  ];

  transform(statusKey: string): string {
    let status = this.enums.find(value => value.enumValue == statusKey);
    if (!status) {
      return "";
    }
    return status.name;
  }
}