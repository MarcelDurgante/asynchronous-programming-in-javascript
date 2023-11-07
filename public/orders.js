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
