/* Iterating with Async / Await introduction: 

The keyword is used when a function is defined, and you can define it with either a standard function declaration like you see on the left or with a fat arrow function like you see on the right. 
In either case, this function will return an implicit promise, which should be somewhat comforting because underneath the function, it's still just a promise that's being operated on. 
It means that whatever you return will be wrapped inside of a promise.

standar.js                            fat-arrow.js

async function getNames() {           const getNames = async () => {
  return = [];                           return = [];
}                                     }

__________

Additionally, if your function throws an error, that will be wrapped inside of a rejected promise. 
The await keyword pauses the execution of an asynchronous function while it waits for the promise to be fulfilled. 
There's a couple of important notes about await. 

> Two Keys to Await:

    - First, it can only be used inside of an async function. If you try to use it outside of an asynchronous function, you will receive an error. 
    - And secondly, it only blocks the current function. However, it does not block the calling function. 

> Blocking Current Function

For example, if you had this code, the await for "someFunc" would halt "getNames" and not go to the "doSomethingElse" until "someFunc" was done. However, it would not stop "getAddresses" from executing.

fetch-names.js

const getNames = async () => {
  await someFunc();
  doSomethingElse();
};

getNames();
getAddresses();

The important thing to note is that both async/await and synchronous promises are both trying to accomplish the same thing. 

The next clip will show you how you can take an asynchronous HTTP call that you've already done in this course and turn it into a single line of code.

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
