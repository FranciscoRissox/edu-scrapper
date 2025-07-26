import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {polling: false});

export const Tg = {
    sendMessage: (key:string, message: string) => {
        bot.sendMessage(key, message, {parse_mode: 'HTML'});
    }
}