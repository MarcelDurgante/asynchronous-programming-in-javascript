/* Presentation Queuing Promises: 

Have you ever needed several functions to run independent of each other, but you couldn't continue until they were all complete? If so, that's a use case that promises excel at. 

One of the first large‑scale applications I wrote using JavaScript required a lot of metadata. There were users and customers and jobs and more, each with their own statuses and types. 

We might have needed 10 pieces of metadata to perform one action on the screen. But I didn't want to load the user metadata and then load customer metadata and then load job metadata because that data wasn't really related. I just need to make sure that all the metadata I did need was loaded before I continued. 

In fact, not only did I not need to have sequential API calls, I didn't want them. It'd be too slow for my users. I wanted to match up all of my calls, fire them off all at once, and then move on once they all came back. 

And this is part of the power of asynchronous programming. You don't have to wait for one call to finish before you start another. And with promises, you can still tell the code to not continue until all of that data comes back. 

As we've already seen, our orders list shows the order status, but it also has a blank field for each of the order's shipping addresses. And in the last clip, we wrote some code to make sure we didn't load our orders until the order statuses were fetched. We want to do something kind of similar with our addresses as well

*/
let statusReq = axios.get("http://localhost:3000/api/orderStatuses");
let addressReq = axios.get("http://localhost:3000/api/addresses");
let addressTypeReq = axios.get('http://localhost:3000/api/addressTypes'); // there is no metadata for address types. We expect this call to fail with a 404 error

let statuses = [];
let addresses = [];
let addresseTypes = [];

showWaiting();

Promise.all([statusReq, addressReq, addressReq, addressTypeReq])
  .then(([statusRes, addressRes, addressTypeRes]) => {
    statuses = statusRes.data;
    addresses = addressRes.data;
    addresseTypes = addressTypeRes.data

    return axios.get("http://localhost:3000/api/orders");
  })
  .then(({ data }) => {
    let orders = data.map((d) => {
      console.log(d);
      const addr = addresses.find((a) => a.id === d.shippingAddress);
      
      return {
        ...d,
        orderStatus: statuses.find((s) => s.id === d.orderStatusId).description,
        shippingAddressText: `${addr.street} ${addr.city}, ${addr.state} ${addr.zipCode}`,
      };
    });
    showOrderList("#order-list", orders);
  })
  .catch((err) => showError("#order-list", err))
  .finally(() => {
    setTimeout(hideWaiting, 1500);
  });

  /* output: 
console:
       GET http://localhost:3000/api/addressTypes 404 (Not Found)                       spread.js:25
       
  OBS: there is no 'uncaught error' as we are already handling it in line 47

screen: Error: Request failed with status code 404
  
  */

/* Summary: 

Notice what happens. 

Not only does the page update nearly instantly with a 404 error, but if you look in the Network tab, it updated before the order status call even completed. 

Let's rerun that one more time and pay attention to the network call and see what happens. 

The //> all function will wait until either all promises are fulfilled or until the first promise is rejected. 

This can be useful in a situation where you don't want to continue if any of your promises are rejected. 

For example, if the address type data had been something so essential that we couldn't possibly continue without it, we wouldn't want to wait for other promises to complete before we continued by handling that error. 

But what if that's not the situation? What if the data is so independent that you don't really care if one or two calls fail and you want to wait until they're all settled? 

I'll show you the two things we need to change to make that happen next.

*/