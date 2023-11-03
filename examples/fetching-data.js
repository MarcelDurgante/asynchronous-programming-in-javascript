let statuses = [];

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/orderStatuses');
xhr.onload = () => { // if the onload call returns success, it will run the code inside the function
    statuses = JSON.parse(xhr.responseText);
};

xhr.send(); // only here the request will be sent to the server

let xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'http://localhost:3000/api/ordes/');
xhr2.onload = () => {
    const orders = JSON.parse(xhr2.responseText);
    const fullOrders = orders.map(o => {
        o.orderStatus = statuses.find(s => s.id === o.orderStatusId).description; // this second request depends on the statuses returned from the first request xhr. status.find() try to look up the status for the given order based on its Id but if the orderStatuses call returns after the order's call than that list is going to be empty and that is what produces the udefined error.
        return o;
    })
    showOrderList('#order-list', fullOrders);
};

xhr2.send;

/* output: Buggy Code

Endpoint: localhost:3000/myOrders will be empty. In the DevTools console, we'll se an error. Especifically and "Uncaught TypeError: Cannot rea properties of undefined (reading 'description')".

If we take a look at the Network panel orders request comes before the orderStatuses and that's what caused the error. 

*/