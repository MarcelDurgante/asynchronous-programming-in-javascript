async function get() {
  showWaiting();
  await Promise.all([
    (async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/orderStatuses"
      );
      showMessage("Statused Fetched"); 
    })(), 
    (async () => {
      const { data } = await axios.get("http://localhost:3000/api/orders");
      showOrderList("#order-list", data);
    })(),
  ]);
}

get();
hideWaiting();
