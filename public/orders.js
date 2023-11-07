/* Handling Errros with Async / Await: 

When handling errors with promises, you only had to attach a catch function. But how do you handle errors with async/await? 

*/

showWaiting();
async function get() {
  const { data } = await axios.get("http://localhost:3000/api/orders");
  showOrderList("#order-list", data);
}

get();
hideWaiting();
