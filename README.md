# [Asynchronous Programming in JavsScript](https://app.pluralsight.com/library/courses/javascript-asynchronous-programming/table-of-contents)
*by [Nate Taylor](https://app.pluralsight.com/profile/author/nate-taylor)*

> [Certificate](https://app.pluralsight.com/achievements/share/9ba5d36a-a9e9-4ba1-852c-f076ad6b65fd).
> ![Certificate Image](https://i.ibb.co/SQjtrwV/certificate-asynchronous-programming-in-javascript-by-pluralsight.png)

## Overview:

 ### Understanding Promises

 - Understanding Promises
 - Solving the Race Condition
 - Problems with Callback Pyramid
 - Solving the Callback Pyramid

 ### Consuming Promises

 - Consuming Promises
 - Handling Errors with Promises
 - Chaining Promises
 - Catching Errors in a Chain
 - Performing One Last Operation 

 ### Queuing Promises
 
 - Queuing Promises
 - Settling All Promises 
 - Waiting for a Single Response
 - Waiting for the First Response

 ### Creating Promises

 - Creating Promises
 - Understanding Promise States
 - Rejecting a Promise

 ### Iterating with Async / Await

 - Iterating with Async / Await
 - Awaiting a Call
 - Handling Errors with Async / Await
 - Chaining with Async / Await
 - Awaiting Concurrent Requests
 - Awaiting Parallel Calls

 #### Review:

 - Every promise has one of three states, pending when the promise has not yet settled, fulfilled when the promise returned successfully, and rejected when the promise has an error or is unsuccessful. 
 - Used these three states to kick off requests, handle the return data, or display errors that came back from the API.
 - How to create your own promises. This will be helpful as you begin to create your own asynchronous code or wrap existing functions and turn them into promises.
    - Remember to create your own promise, you only need to create a new promise object and then pass in an executor function with a resolve and a reject parameter. You can then decide when to use each of those two parameters to update the status of your promise.
 - Async/await excels at the ability turning asynchronous code into sequentially executed code. You can make them concurrent or even parallel as we've seen, but one of the best places to use them is when you need code executed in a particular order.
 
