# Transaction Tracker

A React Native Android application that automatically detects transaction SMS messages, extracts transaction amounts, and enables users to categorize and track expenses without manual entry. The application combines native Android development in Kotlin with a React Native frontend to provide real-time expense tracking and persistent local storage.

## Features

* Detects incoming transaction SMS messages automatically.
* Extracts transaction amounts using regex-based parsing.
* Displays Android notifications for newly detected transactions.
* Allows users to categorize transactions into Food, Shopping, Travel, Bills, and Other.
* Stores categorized transactions locally.
* Displays transaction history and total expenditure.
* Bridges native Android functionality with React Native for real-time UI updates.


## How It Works

1. Android's BroadcastReceiver listens for incoming SMS messages in the background.
2. Transaction SMS messages are identified using keyword matching.
3. Regex-based parsing extracts the transaction amount.
4. The native Kotlin module sends the parsed transaction data to React Native through a custom Native Module.
5. React Native immediately updates the interface and displays the detected transaction.
6. The application generates an Android notification, allowing users to quickly open the app and categorize the transaction.
7. Once categorized, the transaction is stored locally using AsyncStorage.
8. On launch, previously stored transactions are loaded and displayed in the dashboard.

## Screenshots


