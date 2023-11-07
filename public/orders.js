showWaiting();
async function get() {
  const { data } = await axios.get("http://localhost:3000/api/orders");
  showOrderList("#order-list", data);
}

get();
hideWaiting();
