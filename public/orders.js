/* Presentation Queuing Promises: 

Have you ever needed several functions to run independent of each other, but you couldn't continue until they were all complete? If so, that's a use case that promises excel at. 

One of the first large‑scale applications I wrote using JavaScript required a lot of metadata. There were users and customers and jobs and more, each with their own statuses and types. 

We might have needed 10 pieces of metadata to perform one action on the screen. But I didn't want to load the user metadata and then load customer metadata and then load job metadata because that data wasn't really related. I just need to make sure that all the metadata I did need was loaded before I continued. 

In fact, not only did I not need to have sequential API calls, I didn't want them. It'd be too slow for my users. I wanted to match up all of my calls, fire them off all at once, and then move on once they all came back. 

And this is part of the power of asynchronous programming. You don't have to wait for one call to finish before you start another. And with promises, you can still tell the code to not continue until all of that data comes back. 

As we've already seen, our orders list shows the order status, but it also has a blank field for each of the order's shipping addresses. And in the last clip, we wrote some code to make sure we didn't load our orders until the order statuses were fetched. We want to do something kind of similar with our addresses as well

*/

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
