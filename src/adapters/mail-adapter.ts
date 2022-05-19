export interface SendMailData {
  from: string;
  to: string;
  subject: string;
  variables: object;
  path: string;
}

export interface MailAdapter {
  sendMail(data: SendMailData): Promise<void>;
}
