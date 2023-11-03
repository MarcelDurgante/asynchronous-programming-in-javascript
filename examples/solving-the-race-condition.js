let statuses = [];
let xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost:3000/api/orderStatuses");
xhr.onload = () => {
  statuses = JSON.parse(xhr.responseText);
  // SOLUTION to the buggy code from 'examples/fetching-data.js'

  // In order to ensure the correct sequence, we have an xhr that's fetching order statuses and a second xhr that's fetching orders. There's a slight difference though. Now our xhr2 is defined inside the xhr.onload function. And what is that onload function? It's the function that gets called when our request succeeds. So in this code block, we don't even try to make the request for our order unless and until we have the data for our order statuses.

  // However, it comes at a cost. Now our second call is buried inside the success of our first call. 
  
  // And what problems could be caused by nesting functions in this manner? A Callback Pyramid.
  let xhr2 = new XMLHttpRequest();
  xhr2.open("GET", "http://localhost:3000/api/ordes/");
  xhr2.onload = () => {
    const orders = JSON.parse(xhr2.responseText);
    const fullOrders = orders.map((o) => {
      o.orderStatus = statuses.find(
        (s) => s.id === o.orderStatusId
      ).description;
      return o;
    });
    showOrderList("#order-list", fullOrders);
  };
  xhr2.send();
};
xhr.send(); // only here the request will be sent to the server
