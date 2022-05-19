import handlebars from "handlebars";
import fs from "node:fs";
import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: String(process.env.MAIL_HOST),
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: String(process.env.MAIL_USER),
    pass: String(process.env.MAIL_PASS),
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({
    subject,
    to,
    from,
    path,
    variables,
  }: SendMailData): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const mailTemplate = handlebars.compile(templateFileContent);

    const html = mailTemplate(variables);

    await transport.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
