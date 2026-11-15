# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):none
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s):none
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 3
- Tool(s): DeepSeek
- What I asked for:I asked for help in writing the'useEffect' in fetching the JSON file and the validation logic at checkout form,double checking my code when there's error, I also asked guidance to do my personal feature of spice filtering and asking it to explain to me regarding the instructions in the lab sheet if i need a futher explaintion (for example: at step B2)
- What I kept, changed or rejected, and why: I kept the standard React structure and try again button.
I do made some changes into the variable names to match with what I already had previosuly.
- One thing the AI got wrong and how I fixed it:
There's one time I pasted the code for App.jsx then AI missed this line ('const selectedVendor =..').
Then, my website crashed and i figured that I can see at my console tab then it shows what's the error, then I checked again and add the missing line back my own.

## Week 4
- Tool(s): DeepSeek
- What I asked for:I asked AI to help me understand the overall concepts, then as a reference guide. I specifically asked about how context API stops the prop drilling,how to set up React Router. I also asked to ensure if i'm following each step correctly.
- What I kept, changed or rejected, and why: I kept previous week 3 components. I kept all my previous works ( components,css), the fetch logic but i moved it from App.jsx > useVnedors.jsx.
- i updated my header and cartpage to use useCart() , so it's easier to follow the codes.
- i also cahnged the max spice state to useLocalStorage instead of useState, so when refresh the page, the user's choice is still there.
- One thing the AI got wrong and how I fixed it:
I asked deepseek about my app.jsx code, then the website crashed, then i checked the code manually witht he lab sheet's, then i figured i missed the notfoundpage.jsx in the pages folder.

# Week 5
 Tool(s):none
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

# Week 6
 Tool(s): DeepSeek
- What I asked for: I asked for help understanding why my Firestore live listener (`onSnapshot`) wasn't updating the screen, even though the data was already in the database. Then, I got a really confusing error in the browser console saying "Objects are not valid as a React child" when I was building the Orders page, and I couldn't figure out where it was coming from. I also asked for help debugging my Spice Level filter because it was hiding all the menu items instead of just the spicy ones. Then,I asked why my status tracker (Received, Preparing, Ready) was showing all the circles as green at the same time when I updated on the firebase.

- What I kept, changed or rejected, and why:
-About the `onSnapshot` problem, I discovered that I missed the cleanup function return in my `useEffect`. I learned how the cleanup which able to fix my `useVendors` hook.
- As the React child error, I was trying to render  m the entire `items` array directly inside my `<p>` tag instead of using `.map()` to turn them into strings. I fixed my JSX in `OrdersPage.jsx`.
- For the Spice filter, AI helped me realize I had a mismatch where my database field was called `spice`, but my code was looking for `spiceLevel`. I updated my service function to use the right field name to all menus in my query.
- For the tracker, the AI helped me realize the issue wasn't my React code but I had accidentally changed the order status to "Preparing" in the Firebase console, which correctly turned the first two steps green. Then, I tried all status to see any changes.

- One thing the AI got wrong and how I fixed it:
When I was fixing the Spice filter, the AI gave me a Firestore query using `where('spiceLevel', '<=', maxSpice)`. However, because I had seeded my database earlier using the starter JSON, my field was actually just named `spice`. The query returned nothing. I had to debug it myself, check the Firestore console, and change the code to look for `spice` instead.