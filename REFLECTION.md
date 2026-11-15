# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   Imperative UI (Vanilla JS / jQuery);
   - focuses on HOW to update the screen step-by-step.
   - manually select DOM elements, attach listeners, and tweak styles every time data changes.
   -As the app grows, tracking every manual DOM change becomes messy, verbose, and easy to break.
   Declarative UI (React)
   - focuses on WHAT the screen should look like based on current data ($UI = f(state)$).
   - Describe the final UI state using JSX, and React's Virtual DOM automatically calculates and applies the exact DOM updates.
   -This eliminates manual DOM manipulation, making our code cleaner, predictable, and much easier to scale.

2. Why must a component name start with a capital letter?

JSX uses capitalization to tell HTML tags apart from custom components:
- Lowercase (<button>, <div>): React treats these as built-in HTML elements.
- Capitalized (<Profile>, <Header>): React treats these as custom JavaScript components.

if accidentally name a component with a lowercase letter like <profile />, React will treat it like a fake HTML tag instead of running the code.

3. What does a fragment <>...</> do, and why not just use a <div>?

-A Fragment (<>...</>) makes the React groups the elements without adding anything to the web page. The fragment completely disappears when rendered, keeping the HTML clean.
-Because if use <div>an extra HTML tag gets added to the actual web page. This can mess CSS flexbox/grid layouts up and break strict elements like table rows.

4. Name one benefit of splitting the UI into small components.

-Splitting the UI into small components makes the code reusable. 
-Able to write a component once (like a button or card) and reuse it across the entire app, saving time and keeping the code consistent and easy to update.

# Week 6 reflection

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call `setOrders` yourself.
- When I click "Place order", the `handlePlaceOrder` function in `CartPage.jsx` runs. It calls `placeOrders` from my `services/orders.js` file. This function groups my cart items by vendor and uses a Firestore `writeBatch` to save them to the `orders` collection in the cloud. 
- Then, it returns to the Cart page, where I run `clearCart()` and then `navigate('/orders')`. I don't call `setOrders` myself because the `useMyOrders` hook is already running an `onSnapshot`.
- When the new order hits the database, Firestore pushes the data to the listener automatically, which updates the state and displays the new order on the screen right away.

2. Why is `orders` a top-level collection, and why does each order copy `vendorName` and each item's name and price instead of storing only IDs?
- I made `orders` a top-level collection so that a student(user) can view all their past orders from every different vendor in one single list, so they don't need to dig through multiple subcollections. 
- Copy the `vendorName` and the item's name and price directly into the order document because it acts like a permanent receipt.
- If a vendor decides to change their prices or remove an item from their menu tomorrow, the student's past order will still show exactly what they bought and the price they paid at that time.
- If only stored the IDs, the receipt would be incorrect and inaccurate when the menu changed.

3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.
- My feature is (Digit 4: Spice-level badge and filter) stores its data in the `vendors/{vendorId}/menu/{itemId}` path, using the `spiceLevel` field ('spice' in my older ones).
- The line of code that reads it to display the chili emojis is in `MenuItemCard.jsx`:
`const level = Number(item.spiceLevel ?? item.spice ?? 0)`
- The line that filters it directly from Firestore in `services/vendors.js` is:
`const q = query(menuRef, where('spice', '<=', maxSpice))`

4. Stretch Task (Soft-Cancel vs Delete):
- In my opinion, Soft-canceling is better in setting the cancelled. Especially for the vendors because it keeps a historical record of the orders made, which is important for auditing, keep tracking lost revenue, and keep eveyrhting recorded thoroughly. 
- While Deleting right away will erases the data all at once without keeping any history, making it impossible and hard for the vendor or admin to review past issues or statistics.