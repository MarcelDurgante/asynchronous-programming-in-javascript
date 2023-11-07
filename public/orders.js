let statusReq = axios.get("http://localhost:3000/api/orderStatuses");
let addressReq = axios.get("http://localhost:3000/api/addresses");
let addressTypeReq = axios.get('http://localhost:3000/api/addressTypes'); // there is no metadata for address types. We expect this call to fail with a 404 error

let statuses = [];
let addresses = [];
let addressTypes = [];

showWaiting();

Promise.allSettled([statusReq, addressReq, addressTypeReq]) // "Promise.allSettled()" Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.
  .then(([statusRes, addressRes, addressTypeRes]) => {
    // this code will check the status property
    /* 
    Remember, our two choices are either fulfilled or rejected. 
    
    If it's fulfilled, it will assign the data to the array. Because it's fulfilled, we have to use the 'value' property in order to access our actual Axios value. 
    
    If it's not fulfilled, we're simply going to use window.alert to let the user know the error using 'reason'. 
    
    With that all done, let's return again to the browser. When you refresh, after about 1.5 seconds, there's an alert to let you know that the addressTypes call failed, that it's not a valid route for our app.
    */
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

  /* output: 
  
  Window alert:

  localhost:3000 says

  Address Type error: Request failed with status code 404

  OBS: Then, once you clear that alert (by clicking 'OK'), the rest of the data is there again.
  
  */

  /* Differences between *all* and *allSettled*: 
  
  > 1st =>  First the data that is passed back is different. All will return results objects as part of an array. 
  
  But allSettled returns a different shape. It has an array, but for each object, there's two keys. 
  
    - The status key will be either fulfilled or rejected like you see on the screen
  
    - The second key will be either value if the status is fulfilled or reason if the status is rejected. 
    
  That is, the then function on //> allSettled will return all promises even if they're rejected, which leads to the second difference. 

  > 2nd => We don't need a catch block because the promise will resolve with an array of data including the rejected promises.
  
  And even though a catch block is not specifically needed, it's still a good practice to include it. 
  
  It'll help catch any errors that might occur inside of your then block.

! Data returned by *allSettled*

  fulfille.js                                        rejected.js

  {                                                  {
    status: 'fulfilled',                               status: 'rejected', 
    value: {}                                          reason: {}
  }                                                  }
  
  */

  /* Final summary: 
  
  By changing the name of the function from all to allSettled and by expecting a different object shape in the then function, you're able to queue up several promises that wait until they're all settled before calling the then function. 
  
  In the previous clips, we've seen functions that operate on a list of promises and return a list of promises. 
  
  But what if you only need a single promise returned? We'll look at that next.
  
  */
