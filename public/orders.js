/* Awaiting Concurrent Requests - Breaking Free from Sequential Calls: 

We've been using async/await in a way that makes sure to call asynchronous functions in a truly sequential fashion, and sometimes that's great. 
But other times, you don't want functions to depend on one another. 
Don't worry though. You can still use async/await.

*/

showWaiting();

async function get() {
  try {
    const { data: statuses } = await axios.get(
      "http://localhost:3000/api/orderStatuses"
    );
    const { data } = await axios.get("http://localhost:3000/api/orders/");
    const orders = data.map((o) => {
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
hideWaiting();
