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

/* Valid promise Chain: 
  
  promise
    .the()
    .catch()
    .then()
    .then()
    .catch()

In this situation, the first catch will only handle errors that happen in the first then function. 

However, //* the second catch will handle errors that happen in any of the then functions, including the first one. And it will also handle errors that might happen in your first catch function. 

As you start to chain promises together, you might want some code to run only once the entire chain is settled. 

You could have a lot of duplicated code in each then and catch block to ensure that you're capturing that the promise is completely settled. 

Or, as I'll show you next, you could accomplish that with a //> built‑in promise function.
  
*/