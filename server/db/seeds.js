use stocks_hub
db.dropDatabase();

db.stocks.insertMany([
  {
    stock_symbol:"GOOG",
    number_of_shares:100
  },
  {
    stock_symbol:"MSFT",
    number_of_shares:200
  },
  {
    stock_symbol:"STT",
    number_of_shares:500
  },

]);
