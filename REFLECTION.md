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