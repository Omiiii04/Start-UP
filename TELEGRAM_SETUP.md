# Project Wallah - Telegram Bot Integration Setup

This document explains how to set up and configure the Telegram Bot integration for Project Wallah.

## 1. Creating a Telegram Bot

1. Open Telegram and search for the `@BotFather` bot.
2. Send the `/newbot` command to create a new bot.
3. Follow the instructions to choose a name and a username for your bot. (Note: the username must end in `bot`).
4. Once created, `@BotFather` will provide an **HTTP API Token**. Keep this token secure.

## 2. Environment Configuration

In your `backend/.env` file, add the following variables:

```env
# The token provided by @BotFather
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ

# The username of your bot (without the @ symbol)
# This will be exposed to the frontend via the /api/v1/config endpoint
TELEGRAM_BOT_USERNAME=your_new_bot_username

# (Optional but recommended) Chat ID where administrative notifications should be sent
TELEGRAM_ADMIN_CHAT_ID=-1001234567890
```

## 3. Webhook Setup

Project Wallah uses a webhook to receive updates from Telegram (e.g., when a user sends a `/start` command with a link token).

The backend automatically configures the webhook during startup if `TELEGRAM_BOT_TOKEN` and `VITE_API_URL` (or your production domain) are configured. Ensure that your backend is publicly accessible over HTTPS (Telegram requires HTTPS for webhooks).

The webhook URL will be automatically set to:
`https://<your-backend-domain>/api/v1/telegram/webhook`

## 4. User Account Linking

The Telegram integration allows users to link their Project Wallah accounts to their Telegram accounts.
1. The user logs into the Client Dashboard on Project Wallah.
2. The user generates a 10-minute temporary **link token**.
3. The user clicks the Telegram connection link which redirects them to the bot with the payload: `https://t.me/<bot-username>?start=<link-token>`
4. The user clicks "Start" in Telegram.
5. Telegram sends a webhook request to the backend with the payload.
6. The backend verifies the token, associates the user's Telegram `chat_id` with their `users` table record, and replies with a success message.

## 5. Automated Notifications

Once linked, the backend will automatically send notifications to the user's Telegram chat for:
- Intake submission confirmations.
- Invoice generation and payment reminders.
- Engineering pipeline updates.

### Setting Up the Admin Group
If you wish to receive administrative alerts (like new intake requests) in a group:
1. Create a Telegram Group.
2. Add your bot to the group.
3. Determine the Group's Chat ID (you can use external bots like `@RawDataBot` to find this).
4. Add the Group Chat ID to your `backend/.env` as `TELEGRAM_ADMIN_CHAT_ID`.
