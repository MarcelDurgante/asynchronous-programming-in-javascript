/* Chaining Async / Await: 

Promises can be chained to combat race conditions. Let's see how to accomplish the same thing with async/await.



*/

showWaiting();

async function get() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/orders/");
    showOrderList("#order-list", data);
  } catch (err) {
    showError("#order-list", err);
  }
};

get();
hideWaiting();
