/* Quick introduction comparison between Promise.all(), Promise.allSettled() and Promise.any() vs array.every() array.some() 

Let's take a quick detour to talk about two other built‑in JavaScript functions, .every and .some. 

These functions exist on array objects in JavaScript. Both functions follow the same syntax. They take a function that will be evaluated. 
  - With .every, if that function is true for every item in the array, then .every will return true. 
  - With .some, if that function is true for at least one item in the array, then .some will return true. 

When we used Promise.all earlier, it was similar to using Array.every. That is, we only wanted our .then code executed if each promise was successful. 

You might be tempted then to think that Promise.allSettled is like .some except that allSettled called the .then function even if some of the promises failed. That's why, in the last clip, we had to check the status.value of each promise result. 

So if it's not .allSettled, what function is similar to .some? 

> It's a function named '.any', and this will succeed when any of the queued up promises succeed. 

The syntax of the function is similar to .all are .allSettled and that you pass in an array of promises. 

However, the value returned to .then is different than either .all or .allSettled. 

  - It's not an array, but a single item. And that item is the result of the first promise returned. 

Another difference between .all in .any is that:

  - .all will reject the promise, and that is called the .catch function, whenever the first promise rejects. That is, with .all, they either all succeed, or the call fails. 
  - But with .any, it's the opposite, it does not fail unless each promise rejects. 
  
  Again, similar to that .some function. 
  
  In essence, with .any, you're stating if any of the promises succeed, count that as a success. And only count it as a failure if they all reject.

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

  /* Summary: 
  
  But one situation where it can be used as if you've got multiple endpoints that are distributed geographically. They all return the same data so you don't really care which one succeeds; you just want the fastest possible response time. 
  
  In that case, if you used any, that's exactly what you get. Whichever in point returned quickest would win, and your code could move on. 
  
  As I mentioned a few minutes ago, any waits until all promises reject before it fails. 

      -> Every: Returns true if a provided function is true for every item in the array.
      -> Some: Returns true if a provided function is true for at least one item in the array.
      -> Promise.all: Executes code only if every promise is successful (similar to every).
      -> Promise.allSettled: Calls the "then" function even if some promises fail .
      -> Promise.any: Succeeds if any promise succeeds, doesn't fail unless all promises reject (similar to some).

  Promise.all()                    Promise.any()

  Accepts array of promises        Accepts array of promises
  Returns an array of results      Returns a single value
  Catches first rejection          Only catches if all reject 


  > What if you didn't want that and instead wanted the first response to come back whatever it was? We'll talk about that next.
  
  */
