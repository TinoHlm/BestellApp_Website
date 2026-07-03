# 🍔 BurgerHouse – Food Ordering Webiste

BurgerHouse is a responsive food ordering website for a fictional restaurant.  
Users can browse a dynamic menu, add dishes to their basket, adjust quantities, and place an order.

The project is built with **HTML, CSS, and JavaScript** only, without any frameworks.  
It was created as the final project for Section III, Module 7 at Developer Akademie.

## ✨ Features

- **Dynamic menu rendering**  
  The menu is rendered from a JavaScript data object.

- **Menu categories**  
  Users can browse burgers, pizzas, and salads.

- **Interactive basket**  
  Users can add dishes, increase or decrease quantities, remove single items, or delete an item completely.

- **Live price calculation**  
  The basket shows subtotal, delivery fee, and total price.

- **Order confirmation dialog**  
  After placing an order, a confirmation dialog appears with a countdown progress bar and closes automatically after 3 seconds.

- **LocalStorage**  
  The basket is saved in the browser and restored after reloading the page.

- **Responsive design**  
  The layout works on desktop and mobile screens, including a mobile bottom navigation and basket view.

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Responsive Web Design

## 📁 Project Structure

```text
Bestell_app-website/
├── index.html
├── style.css              # Header, hero section, and footer styles
├── script.js              # Main app logic, rendering, basket, LocalStorage, dialogs
├── scripts/
│   ├── db.js              # Menu data and dialog data
│   └── themplate.js       # HTML template functions
├── styles/
│   ├── standard.css       # CSS variables, base styles, and reset
│   ├── assets.css         # Menu, basket, buttons, and dialog styles
│   ├── fonts.css          # Font registration
│   └── mobile.css         # Responsive media queries
└── assets/
    ├── icons/             # App icons and favicon
    ├── imgs/              # Logo, hero image, category images, dish images
    └── fonts/             # Local fonts
```

## 🚀 Getting Started

To run the project locally, you only need a browser.

### Option 1: Open directly

1. Download or clone the repository.
2. Open `index.html` in your browser.

### Option 2: Use a local development server

For the best experience, open the project with a local server, for example with the **Live Server** extension in VS Code.

```bash
# Example with VS Code Live Server:
Right click index.html -> Open with Live Server
```

## 🧠 How It Works

The app loads the menu data from `scripts/db.js`.  
Each category and dish is rendered dynamically with template functions from `scripts/themplate.js`.

The basket state is stored in a JavaScript array and saved to `localStorage` whenever it changes.  
When the page reloads, the saved basket is loaded again and rendered automatically.

## 🛒 Basket Logic

Users can:

- add a dish to the basket
- increase the quantity of a dish
- decrease the quantity of a dish
- remove a dish completely
- see the subtotal
- see the delivery fee
- see the final total

After clicking the order button, the basket is cleared and an order confirmation dialog is shown.

## 📱 Responsive Design

BurgerHouse is optimized for different screen sizes.  
On smaller screens, the basket can be opened through the mobile bottom navigation.

The layout adapts through media queries in:

```text
styles/mobile.css
```

## 📌 Notes

This project focuses on practicing core frontend skills:

- DOM manipulation
- rendering dynamic content
- working with arrays and objects
- using browser storage
- structuring JavaScript into reusable functions
- building responsive layouts with CSS

## 👤 Author

Tino Helmbold  
Developer Akademie Project
