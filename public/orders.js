/* Awaiting Parallel Calls: 

Part of the power of asynchronous programming is that you can make parallel calls so that you're not locking a fast‑running process with a slow‑running process. 

You can do that exact thing with async/await. 

To see how to make parallel calls, start by commenting out the code that we've written so far. 

We need to start by creating our function as an async function and then calling it. 

> Now the question is, what do we put inside of that function to make it work in parallel? 

Remember that async/await is syntactic sugar on top of promises, so we have the ability to mix the two.

*/

async function get() {
  // let's start by awaiting a Promise.all function call. This will wait until all of the promises we pass in are complete before continuing on to the next line.
  await Promise.all([
    // Also remember that async functions return an implicit promise. So, let's add the first promise to our Promise.all call.
    (async () => {
      // We're creating an anonymous async function. Since it's async, it will return a promise, which gets passed into our array of promises for our .all function
      // The body of our anonymous function is the familiar async/await call to get our order statuses.
      const { data } = await axios.get(
        "http://localhost:3000/api/orderStatuses"
      );
      showMessage("Statused Fetched"); // 2. Finally, it's calling a new function, showMessage, that we'll see in a minute when we reload the app.
    })(), // 1. Also notice that after the anonymous function is declared, it's immediately executed with the open and closed parentheses.
    // 3. Next, let's add our second promise, this time for our orders call.  
    (async () => {
      const { data } = await axios.get("http://localhost:3000/api/orders");
      showOrderList('#order-list', data);
    })(),
  ]);
  // 4. With this construct, we now have two promises in the array of our Promise.all function And as we saw earlier in the course, Promise.all will kick off each of the functions and wait until they're all complete before returning. 
  // And since we're awaiting the Promise.all call, the get function won't end until all of our promises are done, meaning that if we added code after our Promise.all function, it wouldn't get executed until all the promises were complete.
};

get();

/* Summary: 

That might seem similar to what we just did in the previous clip. So, what's different? 

Head back over to the browser and reload the page. When you do, the orders list comes back nearly instantly. Then, after about 1.5 seconds, a new message is displayed above our order header stating status is fetched. 

If you check out the Network tab in the console, you'll see that once again the orders call finished before the order statuses call even though it was kicked off second. 

More than that, by using this construct, we were able to update our UI even before all of our API calls finished. 

In a more sophisticated UI, you might use this to update various pieces of data instead of just displaying a Statuses Fetched message at the top of your page. 

This is an example of how you can combine promise functions with async/await to cause parallel execution to happen. 

Both the orderStatuses block of code and the order block of code were running in parallel. 

*/
