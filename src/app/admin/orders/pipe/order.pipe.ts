import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe'
})
export class OrderPipe implements PipeTransform {
  transform(value: any[], statusText: string, filterText: string): any[] {
    if (!statusText || statusText === 'Tümü') {
      return value.filter(p =>
        p.customerName.toLowerCase().includes(filterText.toLowerCase()) ||
        p.orderNumber.includes(filterText)
      );
    } else {
      return value.filter(p =>
        p.status === statusText &&
        (p.customerName.toLowerCase().includes(filterText.toLowerCase()) ||
         p.orderNumber.includes(filterText))
      );
    }
  }
}
