/* Awaiting Parallel Calls: 

Part of the power of asynchronous programming is that you can make parallel calls so that you're not locking a fast‑running process with a slow‑running process. 

You can do that exact thing with async/await. 

To see how to make parallel calls, start by commenting out the code that we've written so far. 

We need to start by creating our function as an async function and then calling it. 

Now the question is, what do we put inside of that function to make it work in parallel? 

Remember that async/await is syntactic sugar on top of promises, so we have the ability to mix the two.

*/

async function get() {

}

get();


/* showWaiting();

async function get() {
  try {
    const statusReq = axios.get("http://localhost:3000/api/orderStatuses" ); 
    const orderReq = axios.get("http://localhost:3000/api/orders/"); 
  
    const { data: statuses } = await statusReq;
    const { data: order } = await orderReq;

    const orders = order.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description, 
      };
    });
    showOrderList("#order-list", orders);
  } catch (err) {
    showError("#order-list", err);
  }
}

get();
hideWaiting(); */
