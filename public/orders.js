let statusReq = axios.get("http://localhost:3000/api/orderStatuses");
let addressReq = axios.get("http://localhost:3000/api/addresses");
let addressTypeReq = axios.get('http://localhost:3000/api/addressTypes'); // there is no metadata for address types. We expect this call to fail with a 404 error

let statuses = [];
let addresses = [];
let addresseTypes = [];

showWaiting();

Promise.allSettled([statusReq, addressReq, addressReq, addressTypeReq]) // "Promise.allSettled()" Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.
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

  /* Differences between *all* and *allSettled*: 
  
  > 1st =>  First the data that is passed back is different. All will return results objects as part of an array. 
  
  But allSettled returns a different shape. It has an array, but for each object, there's two keys. 
  
    - The status key will be either fulfilled or rejected like you see on the screen
  
    - The second key will be either value if the status is fulfilled or reason if the status is rejected. 
    
  That is, the then function on //> allSettled will return all promises even if they're rejected, which leads to the second difference. 

  > 2nd => We don't need a catch block because the promise will resolve with an array of data including the rejected promises.
  
  And even though a catch block is not specifically needed, it's still a good practice to include it. 
  
  It'll help catch any errors that might occur inside of your then block.
  
  */
