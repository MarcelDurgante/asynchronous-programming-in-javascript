// Callback Pyramid of Doom:

// a commom problem that arises when a program uses many levels of nested indentation to control access to a function

// Why is it bad? Because it can hide bugs

// Multipel API Calls

xhr.onload = () => {
  xhr2.onload = () => {
    const order = JSON.parse(xhr2.responseText);
    let xhr3 = new XMLHttpRequest();
    xhr3.open("GET", `payments/${order.paymentId}`);
    xhr3.onload = () => {
      const payments = JSON.parse(xhr2.responseText); // bug: parsing the results that came back on xhr2
      let xhr4 = new XMLHttpRequest();
      xhr4.open("GET", `paymentTypes/${payments.TypeId}`);
      xhr4.onload = () => {
        const paymentType = JSON.parse(xhr4.responseText);
        setText(paymentType.description);
      };
    };
  };
};

/* Let's revisit code from earlier in the module with a slight tweak. 

This time, instead of just getting two pieces of data from the API, it's getting four, and each one is nested inside the previous one. Even though most of it is similar, you still need to process what's happening every time you read it. And in fact, there is actually a bug in this code. 

Inside the xhr3.onload function, instead of parsing the results that come back, you're actually parsing the results that came back on xhr2. It's a common mistake.

Another problem with pyramiding code like this is how do you handle errors? In this example, if xhr3 returned a 500 error from the server, then xhr4 wouldn't be called, and the 'onerror' function of xhr3 would be called. But it's all inside of an onload or xhr2, so what should happen? Well, if you said you should handle the onerror case, you'd be right. 

But that can make your code even messier...

xhr.onload = () => {
    xhr2.onload = () => {
        xhr3.onload = () => {
            xhr4.onload = () => {};
            xhr4.onerror = () => {};
        };
        xhr3.onerror = () => {};
    };
    xhr3.onerror = () => {};
};
xhr.onerror = () => {};

...now because now with the code on the screen, you have a lot more code in your onload functions and you're making the first problem even worse. 

Additionally, your handling errors inside of success functions which can lead to another series of messy decisions and how you write your code. 

So, how can we solve this problem without introducing a new problem? How can we write code so that it executes in the order we want without massive nesting functions?

With Promises.
*/
