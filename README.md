# ClearPay - A neobanking web app

## 📖 Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [How to Test](#how-to-test)
- [Ways to Improve Application](#ways-to-improve-application)

## 🏦 Introduction 

ClearPay is a Neobanking web app which allows users to connect multiple bank accounts, view their latest transactions, and send money to other users on the app. With ClearPay, there is no longer a need to manually track your expenses, as the app will update your expenses as they are processed by your connected bank account..

## 🖥️ Tech Stack

- Next.js
- NextAuth.js
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- ShadCN UI
- Plaid API for bank account connection
- Dwolla API to facilitate ACH transfers

## ⚙️ Features

- 🏦 **Connect multiple bank accounts:** Users can connect real banking data to the application to access their balance and recent transactions.
- 💶 **Send money to users:** Users can send money to other users on the platform through Dwolla ACH transfers
- 🖥️ **Real-time updates:** The app updates transaction data when a new bank account is connected and an ACH transfer is initiated.
- 📱 **Fully mobile responsive:** The app is adaptable to many different screen sizes. Users will have a smooth experience on mobile, tablet, laptop and desktop devices.

## ✅ How to Test

**Note:** The application is currently in Sandbox mode on Plaid and Dwolla, so you do not need to connect any of your real banking data to test the application! However, this also means you can only connect banks from ONE institution (as the institution is treated the same for Sandbox data in Plaid).

To test the application, you can follow the following steps:

1. Navigate to the Sign Up page and create a test user, following the format of inputs on the page (you may follow the placeholders, but emails MUST be unique).
2. Once logged in to your new account, click a Plaid Link button to link banking data.
3. Choose any institution and enter the following credentials:
   - Username: `user_good`
   - Password: `pass_good`
   - (If prompted for two-factor authentication) 2FA Code: 1234
4. Follow the Plaid prompts and view the test data in the application.
5. Find another test user or create another test user and try sending money to them!

## 💶 Ways to improve application

Here are some potential future implementations/improvements to the application:

- **Budgeting:** Allow users to create, track and analyze budgets in various expense categories (the categories in Plaid's API would be good for this).
- **Cryptocurrency:** Allow users to connect crypto wallets and exchange cryptocurrency on the platform.
- **WebSockets and Webhooks:** Integrate webhooks and websockets to update the platform without having to refresh following a new bank account connection or new transaction.
