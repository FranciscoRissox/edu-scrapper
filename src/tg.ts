import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {polling: false});

const getChatId = (type: string) => process.env[`TELEGRAM_CHAT_ID_${type.toUpperCase()}`];

export const Tg = {
    sendMessage: (type:string, message: string) => {
        bot.sendMessage(getChatId(type)!, message);
    }
}