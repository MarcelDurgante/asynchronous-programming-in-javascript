/* Creating Promises introduction: 

You need to make sure that you manage the three states, pending, fulfilled, and rejected. 

Pending is probably the easiest state to handle because, if you remember, a pending promise is just a promise that has not yet settled. So when you create a promise, it's pending until you tell it to move to the fulfilled or rejected states.

How to create a promise?

Promise:

  > A promise is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value. 

  ```javascript

  const tmp = new Promise(); // tmp is a promise object in its pending state
  
  ```

How we change its state?

The first thing to know is that a promise takes a function as the one and only parameter to its constructor. 
This function is called the executor function. The inside of that function can really be as simple or as complex as you want it to be.

> Executor Function

```javascript

promise.js

const tmp = new Promise(() => {});

For demonstration purposes, I'm going to use setTimeout inside that function. 
A quick aside here if you're not familiar with setTimeout. It takes two parameters. 
The first is a function, which gets executed after the second parameter. And the second parameter is a timeout. 
In this case, it means that after 1500 ms, or 1.5 seconds, timeout will be logged to the console. 

```javascript

const tmp = new Promise(() => {
  setTimeout(() => {
    console.log("Timeout");
  }, 1500)
});

```

Promises are eager. That means if we were to run this code right now, the setTimeout function would start executing immediately. And about 1500 ms after we newed up the promise (means creating a new instance of the Promise object and passing in a function that defines what should happen when the promise is resolved or rejected), timeout would be logged to the console.

What gets looged?

The problem is is that all that would happen and still not change the state of the promise at all. 
If this code were to run, what would we get written out to the console? 
Only the word timeout would get logged. We'd never see the word then on the screen.

```javascript

promise.js

const tmp = new Promise(() => {
  setTimeout(() => {
    console.log("Timeout");
  }, 1500)
})
.then(() => console.log('then'));

output:

> Timeout

```

> Updating Promise State

A promise does take a function as its one and only parameter, but it doesn't take an empty function. It takes a parameter, resolve, and this parameter is a function that the promise will use to resolve its state. 
So now we need to decide when we want our promise to be resolved. 
It probably makes the most sense to resolve it after the timeout has triggered, that is inside the function passed into setTimeout. 

In this case, the code looks a little different. 

I've gotten rid of the first console.log statement and replaced it with resolve, and then I've updated the then function to log out whatever value is passed into it. If this code were to run, the statement timeout would be displayed in the console about 1.5 seconds after the promise was kicked off. 


```javascript

promise.js

const tmp = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Timeout");
  }, 1500)
})
.then((data) => console.log(data));

output:

/ Timeout

```
> Examples of Resolved Data

    Status Codes         Result Headers          Blocks of Data


In our case, the data that's passed to then is simply a string. It's that timeout string that we're passing. But remember, in the previous modules, we saw complicated objects from Axios that contained things like status codes and result headers and blocks of data. And even that block of data was possibly also a complicated object. 

When you're creating a promise, what's passed to the then function is completely up to you.

> Timeouts vs Intervals

Looking again at that sample function, we see the setTimeout, and that function will only execute its function one time after the completion of the timeout, in our case 1500 ms. But setTimeout has a related function named setInterval. 

The syntax of the two functions are the same. The difference is how they execute that function. 

Where setTimeout will only execute once, setInterval will execute repeatedly. That is, every 1500 ms, the setInterval function will run again. 

In the next clip, we'll use this feature of setInterval to demonstrate the various promise states.

```javascript

timeout.js                                                    interval.js

const tmp = new Promise((res) => {                            const tmp = new Promise((res) => {
  setTimeout(() => {                                            setInterval(() => {
    resolve("timeout");                                           resolve("timeout");
  }, 1500)                                                      }, 1500)
})                                                            })
.then((data) => console.log(data));                           .then((data) => console.log(data));

output:



```


*/

let statusReq = axios.get("http://localhost:3000/api/orderStatuses");
let addressReq = axios.get("http://localhost:3000/api/addresses");
let addressTypeReq = axios.get("http://localhost:3000/api/addressTypes");

let statuses = [];
let addresses = [];
let addressTypes = [];

showWaiting();

Promise.allSettled([statusReq, addressReq, addressTypeReq])
  .then(([statusRes, addressRes, addressTypeRes]) => {
    // this code will check the status property
    if (statusRes.status === "fulfilled") {
      statuses = statusRes.value.data;
    } else {
      window.alert("Order status error: " + statusRes.reason.message);
    }

    if (addressRes.status === "fulfilled") {
      addresses = addressRes.value.data;
    } else {
      window.alert("Addresses error: " + addressRes.reason.message);
    }

    if (addressTypeRes.status === "fulfilled") {
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
