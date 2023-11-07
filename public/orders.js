let statuses = [];

axios
  .get("http://localhost:3000/api/orderStatuses")
  .then(({ data }) => {
    statuses = data;
    axios.get("http://localhost:3000/api/orders"); // In order to force an error, let's start by deleting the return keyword when we're fetching our orders. This should cause an error with our second then function because data won't be defined. 
  })
  .then(({ data }) => {
    let orders = data.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description,
      };
    });
    showOrderList("#order-list", orders);
  }).catch ((err) => showError('#order-list', err)); // Next, we want to add a catch function. The question is where do we want to add it? Well let's start by placing it after the second then function

  // upon realoding the page the output is printed to the screen and will not see the order table and nothing in the console as we handled the error using '.catch'

  /* output: 
  
  TypeError: Cannot destructure property 'data' of 'undefined' as it is undefined.
  
  */