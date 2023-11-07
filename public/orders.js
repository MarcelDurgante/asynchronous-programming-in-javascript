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
