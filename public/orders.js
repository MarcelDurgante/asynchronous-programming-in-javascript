axios.get('http://localhost:3000/api/orders') // As soon as we issued the get command on Axios, it made the request. It didn't wait around for us to do anything with the data that it returned. Since we know a request is being made and it's returning a successful result according to our xhr window, why isn't there any data showing up on the screen? then function is how we'll handle the data that comes back.

// To do that, we use a function named .then. It's important to note that .then is a promise function and not an Axios function. That is, every time a promise is fulfilled and you want to handle that case, you'll use the then function. The inside of the .then function will only get called when the promise succeeds.

// Inside of that then function is how we'll handle the data that comes back. To do that, we're going to call a helper function, showOrderList, and we're going to give it an HTML ID of order‑list, and we're going to pass in the data. 

// Inside of the function passed into then, we're destructuring the result that is passed it back. That is Axios passes back an object that has a lot of information in it, including a property named data that has the data returned from the API. The other information it sends back includes things like HTTP headers, the status, the request, all that kind of stuff. It's good information, but it's not what we care about. So we're passing that destructured data to a function, showOrderList.

// showOrderList is another one of those helper functions that is in the public src folder. This function creates the HTML for the data that we passed in.
.then(({data}) => {
  showOrderList('#order-list', data);
})

// Summary: 

// This function is the essence of a promise. It starts by calling an asynchronous function. In this case, it's an HTTP GET request. Next, it chains a then function onto that request. Essentially it's saying, after the get completes, run this function next. Remember, part of the definition of a promise is that it handles the eventual completion of an asynchronous call. We're not concerned about when the then call happens, but we know it happens after the get call succeeds. That works great when everything works.