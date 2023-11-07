let statuses = [];
showWaiting();

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
  })
  .catch((err) => showError("#order-list", err))
  .finally(() => {
    setTimeout(hideWaiting, 1500);
  });

  /* Summary: 
  
  For demonstration purposes, it'll let us see the waiting indicator for at least 1.5 seconds before it disappears. Return once more to the browser and reload the app. 
  
  You can see the waiting indicator shows up. And then about 1.5 seconds after the data shows up, the loading indicator goes away. This allows you to run some asynchronous code, handle the success or failure cases, and run some final code. 
  
  In our case, we're using that to clean up our waiting indicator. 
  
  Remember, there are three states of a promise, pending, fulfilled, and rejected. And in this clip, you were able to see each of those three states. And more than that, you were able to see how to start chaining fulfilled and rejected states to handle the flow of your data in your application and then wrap up with a finally function.
  
  */