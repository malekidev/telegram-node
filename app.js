const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const { testAlgorithm } = require('./testCases');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const code = msg.text;

    // بررسی اینکه کد دریافت شده معتبر باشد
    if (!code || !code.startsWith('```')) {
        return bot.sendMessage(chatId, 'لطفاً کد خود را در قالب مناسب ارسال کنید. مثال:\n```\nfunction test() {}\n```');
    }

    // حذف قالب کد (```javascript ... ```)
    const extractedCode = code.replace(/```[a-z]*\n?/, '').replace(/```$/, '');

    bot.sendMessage(chatId, 'کد شما در حال بررسی است...');

    try {
        // بررسی کد با تست‌ها
        const result = await testAlgorithm(extractedCode);

        if (result.success) {
            bot.sendMessage(chatId, `✅ الگوریتم شما درست است!`);
        } else {
            bot.sendMessage(chatId, `❌ الگوریتم شما اشتباه است.\nجزئیات: ${result.error}`);
        }
    } catch (err) {
        bot.sendMessage(chatId, `خطایی در اجرای کد رخ داد:\n${err.message}`);
    }
});
