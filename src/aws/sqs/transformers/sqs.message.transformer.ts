import { SQSRecord } from 'aws-lambda';
import { Message } from '@aws-sdk/client-sqs';
import { MessageAttributeValue } from '@aws-sdk/client-sqs/dist-types/models/models_0';

/**
 * @class SqsMessageTransformer
 */
export class SqsMessageTransformer {
  /**
   * Transform SQSRecord type to Message type
   * @param record
   * @returns Message
   */
  public static transform(record: SQSRecord): Message {
    // transform Attributes
    const transformedAttributes: { [key: string]: string } = {};
    for (const [key, val] of Object.entries(record.attributes)) {
      transformedAttributes[key] = val;
    }

    // transform MessageAttributes
    const transformedMessageAttributes: {
      [key: string]: MessageAttributeValue;
    } = {};
    for (const [key, val] of Object.entries(record.messageAttributes)) {
      transformedMessageAttributes[key] = {
        DataType: val.dataType,
      };
      if ('stringValue' in val) {
        transformedMessageAttributes[key].StringValue = val.stringValue;
      }
      if ('StringListValues' in val) {
        transformedMessageAttributes[key].StringListValues =
          val.stringListValues;
      }
      if ('BinaryValue' in val) {
        transformedMessageAttributes[key].BinaryValue =
          new TextEncoder().encode(val.binaryValue);
      }
      if ('BinaryListValues' in val) {
        transformedMessageAttributes[key].BinaryListValues =
          val.binaryListValues.map((b) => new TextEncoder().encode(b));
      }
    }

    // return  SQS message payload
    return {
      MessageId: record.messageId,
      ReceiptHandle: record.receiptHandle,
      MD5OfBody: record.md5OfBody,
      Body: record.body,
      Attributes: transformedAttributes,
      MessageAttributes: transformedMessageAttributes,
    };
  }
}
