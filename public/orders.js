//  Axios returns a lot more information than the data from the API. It also includes the HTTP headers, status codes, etc. So, let's change from destructuring the object and just have a single result parameter that will have the entire Axios result object. And then we'll need to change from data to result.data. Next, let's examine the result status code. This is the HTTP status code of the request. With HTTP status codes, a 200 is a success. So, we'll use simplified logic that anything that's not a 200 is an error. In this case, if it's success, we'll show the order list. And if it fails, we'll show an error. 
axios.get("http://localhost:3000/api/orders/999").then(({ data }) => { // requesting an order that does not exist (/999) to se how to "Handling Errors with Promises"
    showOrderList("#order-list", data); // if it's success, we'll show the order list
  }).catch((err) => showError("#order-list", err)); // anything that's not a 200 is an error so, if it fails, we'll show an error.
  
/* 1st output: 

Failed to load resource: the server responded with a status of 404 (Not Found)                                            spread.js:25 

uncaught (in promise) Error: Request failed with status code 404                                                          spread.js:25 
    at e.exports (spread.js:25:1)
    at e.exports (spread.js:25:1)
    at d.onreadystatechange (spread.js:25:1)

*/

/* 2nd output (after chanding get function using .catch to handle the rejected state): 

GET http://localhost:3000/api/orders/999 404 (Not Found)                                                                  spread.js:25

Obs: in the localhost:3000/api/orders/999 , we can see the error message:

Error: Request failed with status code 404

*/

/* Summary:

With your console openned as you browse to localhost:3000/myOrders You'll notice that our orders list is empty. The screen just has the Orders header and nothing else. And in your console, you have two errors: 

 a. The first is that the orders/999 is not found.
    - The first error is expected. We're trying to get a record that we knew didn't exist, so we should expect that 404.
 b. And the second is an uncaught error in a promise. 
    - But the second is unexpected.

 What does uncaught in promise mean? 
 
 Remember that a promise can have three states. The promise is in a "pending state" until the API returns something, "middle state": the fulfilled state. But this time, the promise didn't succeed. So now we have to deal with a "rejected state".
 
 And just like fulfilled has its own function that gets called, the rejected state does as well. 
 
 Instead of using .then to handle the "rejected state", we need to use "catch". 
 
 And just as I said when dealing with the fulfilled state, it's important to note that catch is a promise function and not an Axios function. Every time a promise is "rejected" and you want to handle that case, you'll use the "catch" function. 
 
 And just like .then, the 'catch' function only takes a single parameter, and it's a function, and that's the information that the promise sends. It could be an object or a string or whatever the promise wants to send back. 
 
 So let's set our code back to what it was in the beginning. We'll still keep the URL that returns a 404. And in this case, that's orders/999. Just like we did with our .then function, let's chain a catch function. All we want to do is display that error, so we'll still call the showError function. Save that file and go back to the My Orders page and refresh.

 > Syntax of .catch

 .catch((error) => {
   /do stuff with the error
 });

*/
