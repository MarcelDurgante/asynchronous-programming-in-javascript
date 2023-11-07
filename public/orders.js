/* Rejecting a Promise introduction: 

As we've seen elsewhere, you can control what gets passed when a promise gets resolved, and you can also control what gets sent when the promise gets rejected. 
Whatever you pass into the reject function will be passed in as the parameter to the catch function on the code that calls this promise. 

new Promise((resolve, reject) => {
  // some code
  if (something_good) reject {
    resolve();
  } else {
    reject();
  }
});

__________________________

This is a block of code that will promisify our xhr request from earlier in the course. 

Start by understanding that this promise is a function that allows the user to pass in a URL to access via Git. 

You can see that URL parameter here on the line for xhr.open. 

Next, you can see that we're determining if the HTTP status code is a 200, we're going to resolve our promise. That is, we're going to say it was successful if it returned to 200.

But also notice that we have two calls to reject because in our application, we've decided that any call that is not a 200, we want to be considered a failure. And we also want to handle the onerror code of our xhr function. 

Also note that those two rejects are passing back different pieces of data. 

    - The first passes back the status text. For example, if the status code was 404, the status text would be 'not found'. 
    - The second is a more generic error, simply 'Request Failed'.

new Promise((resolve, reject) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);  // url passed into function
  chr.onload = () => {
    if (xhr.status === 200) {
      resolve(xhr.responseText);  // 200 = success
    } else {
      reject(xhr.statusText);  // not 200 = fail
  }
};
xhr.onerror = () => {
  reject("Request failed");  // Error = fail
};
xhr.send();
});

!What I want you to take away from this block of code is that when you are creating a promise, you have some design decisions to make on success and failure. 
!You decide what's a success and what's a failure, and you also decide what data gets passed in those situations.

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
