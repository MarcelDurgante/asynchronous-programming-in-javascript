/* Awaiting a Call: 

We're going to use async/await to fetch our list of orders. 

Much like we did with consuming promises, we want to do a simple HTTP request. 

The code here has the await keyword before the axios.get function call. This highlights that you can use await on functions that return promises. That is, you don't need some separate async/await version of Axios. 

Additionally, since this is now making this promise asynchronous call, you can assign the data parameter to the value of the get call. 

There's no .then function that you need to process this data in. Or more accurately, you can destructure the result of that get call into a data parameter. 

*/

const {data} = await axios.get("http://localhost:3000/api/orders");

showOrderList('#order-list', data);

/* Error output: 

Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules (at orders.js:15:16)

*/