import { registerEnumType } from '@nestjs/graphql';

export enum ParameterValueType {
  String = 'String',
  Int = 'Int',
  Float = 'Float',
  Boolean = 'Boolean',
  JSON = 'JSON',
  ID = 'ID', // reference to one resource  ResourceName:d4918d85-dc58-4f24-969f-649a8bbf7a5d
  IDSet = 'IDSet', // reference to a set of resources  ResourceName1:d4918d85-dc58-4f24-969f-649a8bbf7a5d,ResourceName2:d4918d85-dc58-4f24-969f-649a8bbf7a5d
}

registerEnumType(ParameterValueType, {
  name: 'ParameterValueType',
});
