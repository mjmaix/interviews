// get the total price per
// https://runkit.com/mjmaix/60ac08a7cafc0e001a2aa388

const myOrders = [
  { name: "product 1", price: "10" },
  { name: "product 2", price: "40" },
  { name: "product 3", price: "150" },
  { name: "product 1", price: "100" },
  { name: "product 2", price: "100" },
  { name: "product 3", price: "100" },
  { name: "product 1", price: "10" },
  { name: "product 2", price: "500" },
];

function totalOrderPerProduct(orders) {
  return orders.reduce((prev, current) => {
    const currentVal = prev[current.name] || 0;
    prev[current.name] = currentVal + Number.parseInt(current.price);

    return prev;
  }, {});
}

// expected output

// const expectedOutput = {
//     "product 1": "120",
//     "product 2": "640",
//     "product 3": "250",
// }

console.log(totalOrderPerProduct(myOrders));
