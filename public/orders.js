/* Awaiting a Call: 

We're going to use async/await to fetch our list of orders. 

Much like we did with consuming promises, we want to do a simple HTTP request. 

The code here has the await keyword before the axios.get function call. This highlights that you can use await on functions that return promises. That is, you don't need some separate async/await version of Axios. 

Additionally, since this is now making this promise asynchronous call, you can assign the data parameter to the value of the get call. 

There's no .then function that you need to process this data in. Or more accurately, you can destructure the result of that get call into a data parameter. 

*/

// await mus be used inside an async function
showWaiting();
async function get() {
  const { data } = await axios.get("http://localhost:3000/api/orders");

  showOrderList("#order-list", data);
}

get();
hideWaiting();

/* Error output 1: 

Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules (at orders.js:15:16)

*/

/* output 2: 

This time, when you reload the page, you don't see any console errors.

*/

/* Asynchronous Calls summary: 

On the left, we have our promise‑based approach. And on the right, we have our async/await‑based approach. 

They're both accomplishing the same thing, and they're doing so in similar ways. 

However, with await, it might be slightly more clear the order the code is getting executed in. 

Much like with promises, what happens when an API call fails? Well, the next clip will show you a familiar way to handle errors with async/await.

promise.js                                      await.js

axios.get('/api/orders/')                       const tmp = async function() {
  .then(({ data }) => {                           const { data } = await
    showOrderList('#orders", data);                 axios.get('/api/orders');
  }); 
                                                  showOrderList('#orders', data);
                                                }
*/
