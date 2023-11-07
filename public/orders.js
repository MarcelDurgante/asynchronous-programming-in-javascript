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
