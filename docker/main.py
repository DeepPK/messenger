import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
import requests

TOKEN = "7537054107:AAHwkBopAiYR0fleIogFq57wC2_Se5CxX5s"
BACKEND_URL = "http://backend:8080"

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Привет! Используй команду /get_message <id> для получения сообщения"
    )


async def get_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message_id = context.args[0]
        if not message_id.isdigit():
            raise ValueError

        response = requests.get(f"{BACKEND_URL}/{message_id}")

        if response.status_code == 200:
            message_data = response.json()
            await update.message.reply_text(
                f"Сообщение {message_id}:\n"
                f"От: {message_data['sender']}\n"
                f"Текст: {message_data['text']}\n"
                f"Дата: {message_data['date']}"
            )
        else:
            await update.message.reply_text("Сообщение не найдено")

    except IndexError:
        await update.message.reply_text("Пожалуйста, укажите ID сообщения")
    except (ValueError, KeyError):
        await update.message.reply_text("Некорректный ID сообщения")
    except Exception as e:
        logging.error(f"Ошибка: {e}")
        await update.message.reply_text("Произошла ошибка при обработке запроса")


def main():
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("get_message", get_message))

    application.run_polling()


if __name__ == "__main__":
    main()
