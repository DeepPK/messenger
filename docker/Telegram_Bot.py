import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
import requests

TOKEN = "7537054107:AAHwkBopAiYR0fleIogFq57wC2_Se5CxX5s"
BACKEND_URL = "http://backend:8080/messages"

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)


async def send_api_error(update: Update, error_msg: str):
    await update.message.reply_text(f"🚨 Ошибка: {error_msg}")


def format_message(message: dict) -> str:
    return (
        f"📨 Сообщение #{message.get('id', 'N/A')}\n"
        f"👤 От: {message.get('sender', 'Неизвестно')}\n"
        f"👥 Кому: {message.get('recipient', 'Неизвестно')}\n"
        f"📅 Дата: {message.get('timestamp', 'N/A')}\n"
        f"📝 Текст: {message.get('content', '')}\n"
        "────────────────────"
    )


# ================== КОМАНДЫ ==================
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = (
        "🤖 Доступные команды:\n"
        "/send <sender> <recipient> <текст> - Отправить сообщение\n"
        "/my_messages <recipient> - Мои сообщения\n"
        "/get_message <id> - Найти сообщение по ID\n"
        "/delete_message <id> - Удалить сообщение\n"
        "/all_messages - Все сообщения\n"
        "/search <ключевое слово> - Поиск сообщений"
    )
    await update.message.reply_text(help_text)


async def send_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        args = context.args
        if len(args) < 3:
            await update.message.reply_text("❌ Формат: /send <отправитель> <получатель> <текст>")
            return

        sender, recipient, *content = args
        content = ' '.join(content)

        response = requests.post(
            f"{BACKEND_URL}/send",
            params={
                "sender": sender,
                "recipient": recipient,
                "content": content
            }
        )

        if response.status_code == 200:
            await update.message.reply_text("✅ Сообщение успешно отправлено!")
        else:
            await send_api_error(update, "Не удалось отправить сообщение")

    except Exception as e:
        logging.error(f"Send error: {e}")
        await send_api_error(update, "Ошибка при отправке")


async def get_user_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        recipient = context.args[0]
        response = requests.get(f"{BACKEND_URL}/{recipient}")

        if response.status_code == 200:
            messages = response.json()
            if not messages:
                await update.message.reply_text("📭 У вас нет сообщений")
                return

            formatted = "\n".join([format_message(m) for m in messages])
            await update.message.reply_text(f"📬 Ваши сообщения:\n\n{formatted}")
        else:
            await send_api_error(update, "Не удалось получить сообщения")

    except IndexError:
        await update.message.reply_text("❌ Укажите получателя: /my_messages <recipient>")
    except Exception as e:
        logging.error(f"Get user messages error: {e}")
        await send_api_error(update, "Ошибка при получении сообщений")


async def get_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message_id = context.args[0]
        response = requests.get(f"{BACKEND_URL}/message/{message_id}")

        if response.status_code == 200:
            message = response.json()
            await update.message.reply_text(format_message(message))
        else:
            await send_api_error(update, "Сообщение не найдено")

    except IndexError:
        await update.message.reply_text("❌ Укажите ID сообщения: /get_message <id>")
    except Exception as e:
        logging.error(f"Get message error: {e}")
        await send_api_error(update, "Ошибка при поиске сообщения")


async def delete_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message_id = context.args[0]
        response = requests.delete(f"{BACKEND_URL}/{message_id}")

        if response.status_code == 200:
            await update.message.reply_text(f"✅ {response.text}")
        else:
            await send_api_error(update, "Не удалось удалить сообщение")

    except IndexError:
        await update.message.reply_text("❌ Укажите ID сообщения: /delete_message <id>")
    except Exception as e:
        logging.error(f"Delete error: {e}")
        await send_api_error(update, "Ошибка при удалении")


async def get_all_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        response = requests.get(f"{BACKEND_URL}/all")

        if response.status_code == 200:
            messages = response.json()
            formatted = "\n".join([format_message(m) for m in messages])
            await update.message.reply_text(f"📂 Все сообщения:\n\n{formatted}")
        else:
            await send_api_error(update, "Не удалось получить сообщения")

    except Exception as e:
        logging.error(f"Get all error: {e}")
        await send_api_error(update, "Ошибка при получении сообщений")


async def search_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        keyword = ' '.join(context.args)
        if not keyword:
            await update.message.reply_text("❌ Укажите ключевое слово: /search <слово>")
            return

        response = requests.get(f"{BACKEND_URL}/search", params={"keyword": keyword})

        if response.status_code == 200:
            messages = response.json()
            if not messages:
                await update.message.reply_text("🔍 Ничего не найдено")
                return

            formatted = "\n".join([format_message(m) for m in messages])
            await update.message.reply_text(f"🔎 Результаты поиска:\n\n{formatted}")
        else:
            await send_api_error(update, "Ошибка поиска")

    except Exception as e:
        logging.error(f"Search error: {e}")
        await send_api_error(update, "Ошибка при поиске")


def main():
    application = Application.builder().token(TOKEN).build()

    handlers = [
        CommandHandler("start", start),
        CommandHandler("send", send_message),
        CommandHandler("my_messages", get_user_messages),
        CommandHandler("get_message", get_message),
        CommandHandler("delete_message", delete_message),
        CommandHandler("all_messages", get_all_messages),
        CommandHandler("search", search_messages)
    ]

    application.add_handlers(handlers)
    application.run_polling()

if __name__ == "__main__":
    main()