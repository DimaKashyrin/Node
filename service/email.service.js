const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD } = require('../configs/config');
const allTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NO_REPLY_EMAIL,//email з якого відправлення листа
    pass: NO_REPLY_EMAIL_PASSWORD,//пароль
  }
});

const sendMail = async (userMail, emailAction, context) => {
  const templateInfo = allTemplates[emailAction];
  if(!templateInfo){
    throw new Error('Wrong template name!!!');
  }
  const html = await templateParser.render(templateInfo.templateName, context);
  return transporter.sendMail({
    from: 'No reply',// імя хто надсилає
    to: userMail,// адресат кому надсилають
    subject: templateInfo.subject,//тема
    html// сам лист
  });
};

module.exports = {
  sendMail
};

