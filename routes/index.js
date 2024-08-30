const express = require('express');
const router = express.Router();
const { browser } = require('../untils/browers');
const { fetchData } = require('../untils/fetchData');
const { getStudentInfo, getScheduleInfo } = require('../untils/parser');
const { headers } = require('../untils/headers');
const { validateInput } = require('../untils/validate');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

let info = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  campus: '3'
};

bot.command('updatefull', async (ctx) => {
  const [newUsername, newPassword, newCampus] = ctx.message.text.split(' ').slice(1);

  try {
    const updatedInfo = validateInput({ username: newUsername, password: newPassword, campus: newCampus });
    info = updatedInfo;
    ctx.reply('Info updated successfully!');
  } catch (error) {
    ctx.reply(error.message);
  }
});

bot.command('update', async (ctx) => {
  const newUsername = ctx.message.text.split(' ')[1];

  try {
    const updatedInfo = validateInput({ username: newUsername, password: info.password, campus: info.campus });
    info = updatedInfo;
    ctx.reply('Username updated successfully!');
  } catch (error) {
    ctx.reply(error.message);
  }
});

bot.launch();

router.get('/', async function (req, res, next) {
  try {
    const { RequestVerificationToken, ASPNET_SessionId, browserInstance } = await browser(info);
    const headersResult = headers(RequestVerificationToken, ASPNET_SessionId);

    const runTask = async () => {
      const [data1, data2] = await Promise.all([
        fetchData('https://ap.greenwich.edu.vn/Donor.aspx', headersResult),
        fetchData('https://ap.greenwich.edu.vn/Phuhuynh/ScheduleOfWeek_Donor.aspx', headersResult)
      ]);

      const student = getStudentInfo(data1);
      const schedule = getScheduleInfo(data2);

      res.render('index', { student, schedule });
      // res.json({ student, schedule });

      setTimeout(async () => {
        await closeBrowser(browserInstance);
        console.log('Browser closed after 5 minutes.');
      }, 5 * 60 * 1000);
    };

    await runTask();
    console.log('Task executed successfully.');
  } catch (error) {
    console.error('Error executing task:', error);
    res.status(500).send('An error occurred while executing task.');
  }
});

async function closeBrowser(browserInstance) {
  await browserInstance.close();
}


module.exports = router;
