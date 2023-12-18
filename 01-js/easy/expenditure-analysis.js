/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {

  // Transaction is a list of objects
  // In each object it would be category : category-name and price : value
  let expenditureAnalysis = [];
  for(let i=0;i < transactions.length;i++){
    let flag = -1;
    for(let j=0;j < expenditureAnalysis.length;j++){
      if(expenditureAnalysis[j]["category"] == transactions[i]["category"]){
        flag = 1;
        expenditureAnalysis[j]["totalSpent"] += transactions[i]["price"];
      }
    }
    if(flag == -1){
      let newObj = {
        "category" : transactions[i]["category"],
        "totalSpent" : transactions[i]["price"]
      }
      expenditureAnalysis.push(newObj);
    }
  }

  return expenditureAnalysis;
}

module.exports = calculateTotalSpentByCategory;
