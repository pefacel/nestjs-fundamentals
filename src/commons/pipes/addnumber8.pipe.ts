import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class AddNumber8Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value + 8;
  }
}
