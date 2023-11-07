/* Handling Errros with Async / Await: 

When handling errors with promises, you only had to attach a catch function. But how do you handle errors with async/await? 

As we did with our promise code, change the route to get order 999 because this will produce an error just like it did when we used it with our promises. 

In the last clip, I promised you that it's a familiar way to handle the error. You want to try and take a guess at what that way is? Believe it or not, this is one place where it's not really related to promises. 

That is, there is not an awaitCatch function. Instead, it's the tried and true try/catch block. 

*/

showWaiting();

async function get() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/orders/999");
    showOrderList("#order-list", data);
  } catch (err) {
    showError("#order-list", err);
  }
};

get();
hideWaiting();

/* output: 
console:

GET http://localhost:3000/api/orders/999 404 (Not Found)                spread.js:25 

screen:

Error: Request failed with status code 404

*/

/* If you save that and reload the page, you'll see a familiar 404 error in the response text, and you'll notice the standard 404 error in the console as well. 

Looking at this code one last time, notice that since the error handling is the standard JavaScript try/catch block, you now have the ability to have the same error handling for both your synchronous and asynchronous code if you're using async/await.
*/
