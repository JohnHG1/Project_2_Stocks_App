use stocks_hub
db.dropDatabase();

db.stocks.insertMany([
  {
    stock_symbol:"GOOG",
    number_of_shares:10,
    price: 1234.92
  }
  // {
  //   stock_symbol:"MSFT",
  //   number_of_shares:200,
  //   price: 155.71
  // },
  // {
  //   stock_symbol:"STT",
  //   number_of_shares:500,
  //   price: 54.88
  // },

]);
