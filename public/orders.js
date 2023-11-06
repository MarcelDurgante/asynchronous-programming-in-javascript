// requesting an order that does not exist (/999) to se how to "Handling Errors with Promises"
axios.get("http://localhost:3000/api/orders/999").then(({ data }) => {
  if (XPathResult.status === 200) {
    showOrderList("#order-list", data);
  } else {
    showError("Error!");
  }
});
