let statuses = [];

axios
  .get("http://localhost:3000/api/orderStatuses")
  .then(({ data }) => {
    statuses = data;
    return axios.get("http://localhost:3000/api/orders");
  })
  .then(({ data }) => {
    let orders = data.map((o) => {
      return {
        ...o,
        orderStatus: statuses.find((d) => d.id === o.orderStatusId).description,
      };
    });
    showOrderList("#order-list", orders);
    console.table(orders); 
  });

  /* output: 
  
(index)     id     orderStatusId     userId     shippingAddress    billingAddress    itemIds     total         date                 orderStatus
0	          1      1	               2	        3	                 4	               Array(2)    '$318.00'	   'Dec 12, 2020'	      'In process'
1         	2	     3	               2	        2	                 2	               Array(2)    '$678.00'	   'July 7, 2021'	      'Billed'
2	          3	     1	               2	        4	                 4	               Array(1)	   '$85.00'	     'Dec 10, 2022'	      'In process'

Array(3)
  > 0: {id: 1, orderStatusId: 1, userId: 2, shippingAddress: 3, billingAddress: 4, …}
  > 1: {id: 2, orderStatusId: 3, userId: 2, shippingAddress: 2, billingAddress: 2, …}
  > 2: {id: 3, orderStatusId: 1, userId: 2, shippingAddress: 4, billingAddress: 4, …}
    length: 3
  > [[Prototype]]: Array(0)
  
  */
