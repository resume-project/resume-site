import { text } from 'express';
import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

const Email = process.env.EMAIL;
const Password = process.env.PASSWORD;

export const mailSend = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail을 사용
    auth: {
      user: config.email.email,
      pass: config.email.password,
    },
  });

  data.sender =
    data.sender == '' || data.sender == undefined ? Email : data.sender;

  const mailOptions = {
    from: data.sender, // 작성자
    to: data.receiver, // 수신자
    subject: data.subject, // 메일 제목
    html: data.text, // 메일 내용
  };

  const response = await transporter.sendMail(
    mailOptions,
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return info.response;
      }
    }
  );

  return response;
};
