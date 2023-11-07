/* Chaining Async / Await: 

Promises can be chained to combat race conditions. Let's see how to accomplish the same thing with async/await.

*/

showWaiting();

async function get() {
  try {
    //  Inside of our try block, let's add a call to get our order statuses
    const { data: statuses } = await axios.get(
      "http://localhost:3000/api/orderStatuses"
    );
    const { data } = await axios.get("http://localhost:3000/api/orders/");
    // At this point, we have both of our statuses and our orders, so we can loop over them and assign the correct status to each order.
    const orders = data.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description,
      };
    });

    showOrderList("#order-list", orders); // And then we just need to make sure that we're passing the orders value to the showOrderList function
  } catch (err) {
    showError("#order-list", err);
  }
}

get();
hideWaiting();

/* output: 

We again get our list of orders, each with an order status, which is what we'd expect. 
And when we look at our Network tab in the console, we see that the order status call is first, and the orders call is second, again what we would expect since we sequenced our API calls in this order.

*/

/* Final summary: 

 if you want to chain another HTTP request, all you have to do is add another await statement to that API call. 
 
 The challenge is that handling async/await in this fashion makes all of the calls sequential. 
 
 So, what if you want to make concurrent requests? 
 
 I'll show you how async/await can break free from the sequential calls in the next clip.

*/
