let statuses = [];

axios
  .get("http://localhost:3000/api/orderStatuses")
  .then(({ data }) => {
    statuses = data;
    return axios.get("http://localhost:3000/api/orders"); // put back the return statment
  })
  .then(({ data }) => {
    let orders = data.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.order.orderStatusId).description, // add 'order' to cause an error 
      };
    });
    showOrderList("#order-list", orders);
  }).catch ((err) => showError('#order-list', err)); 

  /* output: 
  
  TypeError: Cannot read properties of undefined (reading 'orderStatusId')

  
  */