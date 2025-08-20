# Sneaker E-Commerce Page

This is a TypeScript-based e-commerce web application showcasing a single product (Fall Limited Edition Sneakers) with an interactive image carousel, cart functionality, and a responsive design. The project uses plain TypeScript, HTML, and CSS (no frameworks) to create a clean, user-friendly interface for browsing product images, adding items to a cart, and viewing cart details with a badge indicator.
Features

<img src="images/Screenshot 2025-08-19 at 17-00-42 E-commerce product page.png" alt="">

## Product Carousel

Displays a main product image with clickable thumbnails.
Mobile view (≤480px) includes prev/next buttons for navigation.
Clicking the main image opens an overlay with a larger image and thumbnails (desktop only).

<img src="images/Screenshot 2025-08-19 at 17-00-42 E-commerce product page.png" alt="">

## Cart Functionality

Add items to the cart with a quantity counter (+/- buttons).
Cart badge on the nav cart icon shows total item count (appears when >0).
Clicking the cart icon toggles a popup showing cart items, quantities, and totals.
Delete items from the cart via a delete icon.

<img src="images/Screenshot 2025-08-19 at 17-02-08 E-commerce product page.png" alt="">

<img src="images/Screenshot 2025-08-19 at 17-04-26 E-commerce product page.png" alt="">

## Responsive Design

Adapts to various screen sizes (mobile: 320-480px, tablet: 481-991px, desktop: ≥992px).
Mobile menu toggle for navigation links.
Hides thumbnails in mobile view; shows prev/next buttons instead.
<img src="images/Screenshot 2025-08-19 at 17-10-41 E-commerce product page.png" alt="">

## Smooth UI

Image transitions with opacity effects.
Hover effects on buttons, links, and thumbnails.
Orange theme (hsl(26, 100%, 55%)) for buttons and highlights.
<img src="images/Screenshot 2025-08-19 at 17-05-02 E-commerce product page.png" alt="">

## Prerequisites

Node.js (v14 or higher): For running the development server and TypeScript compiler.
npm (v6 or higher): For managing dependencies.
TypeScript: To compile script.ts to script.js.
A modern web browser (e.g., Chrome, Firefox) for testing.

## Setup Instructions

Clone the Repository:
git clone <https://github.com/theguylex/sneakers-e-commerce-typescript>

cd e-commerce-typescript

## Install Dependencies

Install lite-server for local development:
npm install

If package.json is missing, install lite-server manually:
npm install lite-server --save-dev

Verify package.json:Ensure it includes:
{
  "scripts": {
    "start": "lite-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "lite-server": "^2.6.1"
  }
}

Verify tsconfig.json:Ensure the project has a tsconfig.json in the root:
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true
  },
  "include": ["src/**/*"]
}

This compiles src/script.ts to dist/script.js.

Compile TypeScript: Compile script.ts to script.js:
npx tsc

For auto-compilation during development:
npx tsc --watch

Run the Development Server:
Start the local server:
npm start

Opens server (port may vary).

## File Structure

e-commerce-typescript/

├── dist/
│   └── script.js          # Compiled JavaScript from script.ts
├── images/
│   ├── icon-cart.svg      # Cart icon
│   ├── icon-delete.svg    # Delete icon for cart items
│   ├── image-product-1.jpg # Main product image
│   ├── image-product-1-thumbnail.jpg # Thumbnail image
│   └── image-avatar.png   # User avatar
├── src/
│   └── script.ts          # TypeScript source code
├── index.html             # Main HTML file
├── style.css              # CSS styles
├── package.json           # Node.js dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file

index.html: Defines the page structure, links to style.css and dist/script.js.
style.css: Styles the layout, carousel, cart, and badge with responsive media queries.
src/script.ts: TypeScript code for carousel, cart, badge, and menu functionality.
dist/script.js: Compiled JavaScript loaded by index.html.

## Usage

View the Product:

Open on server.
Browse the main product image and thumbnails (desktop) or prev/next buttons (mobile).
Click the main image (desktop) to open an overlay with larger images and thumbnails.

Add to Cart:

Use +/- buttons to set quantity (e.g., 2).
Click “Add to cart” to add items.
A badge appears on the cart icon (e.g., “2” for 2 items).
The cart popup does not open automatically.

View/Toggle Cart:

Click the cart icon (.navCart) to show the cart popup.
View items, quantities, and totals (e.g., “$125.00 x 2 $250.00”).
Click the cart icon again to hide the popup.

Remove Items:

In the cart popup, click the delete icon next to an item.
Cart updates, and the badge reflects the new total (disappears if empty).

Mobile Navigation:

On mobile (≤480px), click the menu icon to toggle navigation links.
Thumbnails are hidden; use prev/next buttons for carousel navigation.

Run npx tsc --diagnostics and check errors.
Ensure tsconfig.json is correct and src/script.ts exists.
Verify Node.js and TypeScript are installed:node -v
tsc -v

Page Not Loading:

Confirm lite-server is installed and npm start runs.
Check index.html references dist/script.js

Ensure dist/script.js exists (run npx tsc).

Images Not Loading:

Verify images/ folder contains all required files.
Check paths in index.html and script.ts (e.g., images/image-product-1.jpg).

## Future Improvements

Persist Cart: Use localStorage to save cart data across sessions.
Checkout Logic: Add functionality to the “Checkout” button (e.g., clear cart, show confirmation).
Multiple Products: Extend to support multiple products with dynamic data.
Accessibility: Add ARIA labels and keyboard navigation.
Testing: Add unit tests with Jest for cart and carousel logic.
Build Pipeline: Use Webpack or Vite to bundle TypeScript and CSS.

License
MIT License
Copyright (c) 2025 [Your Name]
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
