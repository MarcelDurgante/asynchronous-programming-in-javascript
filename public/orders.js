/* Promises State:

What happens when a function that has been promisified fires multiple times? Understanding this will help you understand promise states. Let's start by looking at the code we just finished the last clip with. As we saw, that code logs out to the console once after 1500 ms. 

Now, if we change our function from setTimeout to setInterval, we'd have a similar, but slightly different situation. Remember that the difference between timeout and interval is that interval will run continuously. In this case, it will trigger every 1500 ms. 

So, what do you think will happen when we run the code below?

When I run this, it will produce a timeout after 1.5 seconds and log that out to the screen. But if we wait here for a little bit, it doesn't log out another timeout. 

In fact, we could wait here all day, and it wouldn't log out another timeout. So, does a promise change the behavior of setInterval? Well, not quite. 

promise.js

const tmp = new Promise((resolve) => {
  setInterval(() => {
    resolve("Timeout");
  }, 1500)
})
.then((data) => console.log(data));

output:

Promise { pending }
> timeout

___________________________________________

We'll try something else. Before I run this code, notice that the only difference is the new line where I log out the word interval before it calls resolve. 

promise.js

const tmp = new Promise((resolve) => {
  setInterval(() => {
    console.log('interval');
    resolve("Timeout");
  }, 1500)
})
.then((data) => console.log(data));

output:

Promise { pending }
> interval
timeout
interval
interval
interval
interval
interval
interval


This time, when I execute the code, we see after 1500 ms that it logs out both interval and timeout. Then, after another 1500 ms, it only logs out interval.So the setInterval function is behaving as normal. That is, it's executing every 1500 ms. But it's only resolving once. 

Let's paste in one more block of code. Again, before running this, notice what's different. All I've done is add a finally block. This time, when it's run, we see interval, then timeout, then done. Then, after 1500 ms, we again see interval.

promise.js

const tmp = new Promise((resolve) => {
  setInterval(() => {
    console.log('interval');
    resolve("Timeout");
  }, 1500)
})
.then((data) => console.log(data)).finally(() => console.log('done'));

output:

Promise { pending }
> interval
timeout
done
interval
interval
interval
interval
interval

So, what's happening here? 

Remember earlier in the course when we talked about states? 

I mentioned that there are two other words that are used to reference when a promise is no longer pending. 

Those words are: //> settled or resolved. 

And based on the last demo, you can see that once a promise is settled, its state is not updated. 

That's because calling resolve causes the promise to be resolved so that if you call resolve or reject again, it has no effect. 
That is, once the promise is settled, it's done. And attempting to settle it again won't do anything. 

It's also why the finally function in our last demo executed right away. In fact, it executed before setInterval could kick off its next log. The function continues to run, but the promise will not change. 

If moving a promise to the fulfilled state is that easy, then surely moving it to the rejected state is just as easy, right? Well, we'll find out in the next clip.

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
