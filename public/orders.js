/* Awaiting Concurrent Requests - Breaking Free from Sequential Calls: 

We've been using async/await in a way that makes sure to call asynchronous functions in a truly sequential fashion, and sometimes that's great. 
But other times, you don't want functions to depend on one another. 
Don't worry though. You can still use async/await.

*/

showWaiting();

async function get() {
  try {
    // Start by changing everything to the left of Axios for our orderStatuses orders request and replace it with a variable. Notice that there's not an await stament in bothe anymore
    // Keep in mind that axios.get is still a promise, and promises are eager as I've mentioned many times in this course. That means that the request has already been kicked off.
    const statusReq = axios.get("http://localhost:3000/api/orderStatuses" ); // In this code, we have requested our order statuses. But we had to wait 1.5 seconds, because that's how long that request takes. So, let's make a couple of tweaks.
    const orderReq = axios.get("http://localhost:3000/api/orders/"); // And then, once that data was returned, we requested our orders.

    // Now, after our request, let's await our two functions. 
    const { data: statuses } = await statusReq;
    const { data: order } = await orderReq;

    //change the variable name from data to orders
    const orders = order.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description, // And after those two awaited statements, we process our results to set the order status on each order
      };
    });
    showOrderList("#order-list", orders);
  } catch (err) {
    showError("#order-list", err);
  }
}

get();
hideWaiting();

/* Final summary: 

Heading to our browser, reload the page. After a brief pause, you'll see all the data instantly appear after about 1.5 seconds. 
Before returning to the code, take a look at the console, and you'll see that the orders API call resolved first, and the order status call resolved second. 
And you can tell that by the green bar. 

So even though the orders request happened second, it completed before the order's status call completed. 

Return to the code and take a look at the await statements. 

We're awaiting the order statuses first, which means we don't do anything with our orders data until we get the data for our order statuses. 
But because the order statuses, recall, is slower, by the time the await is complete, the request for orders is also already complete. 
So both calls were running at the same time even if we did tell the code to wait on the slower request first.

There's one more possibility for these calls.
What if we wanted to handle the same two calls, but show the data in the order that it came back. 
In the next clip, you'll see how to handle that exact case.

*/