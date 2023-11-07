/* output: 

Have you ever had an API request that usually returns really quick, but occasionally can take a long time? 

In those situations, you don't want to flash up a loading indicator only for it to instantly disappear because that could be too jarring for your users. 

But you also don't want to not have an indicator for those cases where it does take a long time. 

You could use this next promise function to make that request and, if it's taking too long, show a loading indicator. 

The Promise.race function is similar to Promise.any in that it takes an array of promises and passes a single value to its then function. 

> The difference between any and race though is when it returns.

  Promise.any()                                                  Promise.race()

  - Accepts array of promises                                    - Accepts array of promises
  - Returns a single value                                       - Returns a single value
  - Returns first successful or after all are rejected           - Returns first settled promise 

  As we saw in the last clip, any returns the first successful promise. Otherwise, it waits until all the promises are rejected. But race doesn't care about the result. Whenever the first promise settles, race settles. It's a race between the promises regardless of the results. 
  
  That means when you use race, you definitely need to handle both the .then and .catch functions. If the first promise to settle is successful, it will call the then function. However, if the first promise to settle fails, it'll call the catch function. 
  
  As I mentioned at the start of the clip, this could be useful to put a timeout on one of your requests. 
  
  ```javascript

  Promise.race([possiblyLongRunningRequest, timeout])
  .then(val => showData(val));
  .catch(() => showTryAgainLater());

  ```
  
  In this code, if the possibly long running‑request succeeds, it will call the then block and show the user data. However, if the timeout promise completes first, it will throw an error, and the catch block will be displayed showing a message like there's an issue with your request: "Please try again later"

  You've now learned that there are four distinct ways to cue up a list of promises. 
  
      > All will wait until either all promises are fulfilled or until one promise is rejected. 
  
      > AllSettled will wait until all promises are settled, either fulfilled or rejected. 
  
      > Any will wait until the first promise is fulfilled or until all promises are rejected. 
  
      > And race will only wait until the fastest promise is settled, either fulfilled or rejected. 
  
  With these functions, you have a lot of control over how promises are used in your application.
  
  And up until this point, we've been focusing on how to consume promises. But how can you actually create a promise? The next module will show you the two main things you need to consider when creating a promise.

  > Promise Queuing Functions

  all          | All are fulfilled or one is rejected

  allSettled   | All are settled 

  any          | First is fulfilled or all are rejected

  race         | First is settled 

*/

let statusReq = axios.get("http://localhost:3000/api/orderStatuses");
let addressReq = axios.get("http://localhost:3000/api/addresses");
let addressTypeReq = axios.get('http://localhost:3000/api/addressTypes'); 

let statuses = [];
let addresses = [];
let addressTypes = [];

showWaiting();

Promise.allSettled([statusReq, addressReq, addressTypeReq]) 
  .then(([statusRes, addressRes, addressTypeRes]) => {
    // this code will check the status property
    if(statusRes.status === 'fulfilled') {
      statuses = statusRes.value.data;
    } else {
      window.alert("Order status error: " + statusRes.reason.message);
    }

    if(addressRes.status === 'fulfilled') {
      addresses = addressRes.value.data;
    } else {
      window.alert("Addresses error: " + addressRes.reason.message);
    }

    if(addressTypeRes.status === 'fulfilled') {
      addressTypes = addressTypeRes.value.data;
    } else {
      window.alert("Address Type error: " + addressTypeRes.reason.message);
    }

    return axios.get("http://localhost:3000/api/orders");
  })
  .then(({ data }) => {
    let orders = data.map((d) => {
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
