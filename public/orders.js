let statuses = [];

axios
  .get("http://localhost:3000/api/orderStatuses")
  .then(({ data }) => {
    statuses = data;
    return axios.get("http://localhost:3000/api/orders");
  })
  .then(({ data }) => {
    let orders = data.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description,
      };
    });
    showOrderList("#order-list", orders);
    console.table(orders); 
  });
