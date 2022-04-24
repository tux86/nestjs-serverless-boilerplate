import { EmailSendSuccessEvent } from "../events/email-send-success.event";
import { OnEvent } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailSendSuccessListener {
  @OnEvent("email.send.success")
  handleEmailSendSuccess(event: EmailSendSuccessEvent) {
    console.debug("email delivered");
  }
}
