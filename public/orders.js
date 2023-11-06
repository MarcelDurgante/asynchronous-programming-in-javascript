//> One nice thing about promises is that the settled functions, then and catch, both return promises. This means that you can chain promises together.

// We want to add some information to our orders list page. Specifically, we want to display the order status. To do that, we'll first fetch our list of order statuses and then use that data to look up the status of our order. So start by creating a get that fetches order statuses instead of orders.

// At this point, our data object is an array of orderStatuses. And now that we have all of those, let's fetch our list of orders.

// Nos add a new variable before Axios and name it Statuses. Then before our second Axios call, let's assign data to our statuses variable.

// Next, we need to make sure that we return our second Axios call. If we don't, JavaScript will return undefined from the function, and we'll have all sorts of issues.

// After our existing then, let's add one more then.

// Inside of our second then function, the value of data is our orders. We're mapping over our list of orders so that we can look up each order's status, and that's what we're doing with the statuses.find function. We're finding the status description of that exact order. Once we've added the order status property to each order, we can call the familiar showOrderList. Now that that's all typed up, make sure the file is saved and that your server is still running. When you refresh the My Orders page, the orders again display, and this time the Order Status column is filled in.

// if you pop over to the Network tab in the developer tools, you'll see that the call to orderStatuses executed before our call to orders.

// we did it without nesting a lot of function calls inside of function calls inside of function calls. That is, we didn't have to use the callback pyramid. Look at the code one more time, and let's read this code from top to bottom.

let statuses = []; // new array assigned to statuses variable

axios
  .get("http://localhost:3000/api/orderStatuses") // fetch our list of order statuses
  .then(({ data }) => {
    // then use that data to look up the status of our order. At this point, our data object is an array of orderStatuses
    statuses = data;
    return axios.get("http://localhost:3000/api/orders"); // now that we have all of those, let's fetch our list of orders.
  })
  .then(({ data }) => {
    // Inside of our second then function, the value of data is our orders
    let orders = data.map((o) => {
      // We're mapping over our list of orders so that we can look up each order's status,
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description, //  and that's what we're doing with the statuses.find function. We're finding the status description of that exact order. Once we've added the order status property to each order
      };
    });
    showOrderList("#order-list", orders); // we can call the familiar showOrderList
  });

/* Brief summary: 

It starts by getting all of the order statuses. Then, it fetches all the orders. Then, it loops over those orders and assigns their order status description. 

Our code is starting to become a bit more clear and readable just by using promises, and you can imagine how you could change several promises together in this fashion as long as you remember to return the promise in each then. 

But what if you're like me and you forget sometimes to return the promise? I'll show you how you can handle that situation more gracefully in the next clip.

*/
