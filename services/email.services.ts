import config from 'config';
import nodemailer from 'nodemailer';

import Logger from 'loaders/logger';

class EmailService {
  public sendEmail = (
    from: string,
    emailTo: string,
    subject: string,
    htmlMessage,
  ) => {
    const transporter = nodemailer.createTransport(config.transport);

    const email = {
      from,
      to: emailTo,
      subject,
      html: htmlMessage,
    };
    return new Promise((resolve, reject) => {
      try {
        transporter
          .verify()
          .then(() => {
            Logger.info(
              'Se ha conectado correctamente con el servidor de correo...',
            );
            transporter.sendMail(email, (err, data) => {
              if (err) {
                Logger.error(err);
                reject(err);
              }
              Logger.info(
                `Se ha enviado el correo a la direccion 
                ${emailTo} con el concepto ${subject}`,
              );
              resolve(data);
            });
          })
          .catch((err) => {
            Logger.error(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default new EmailService();
