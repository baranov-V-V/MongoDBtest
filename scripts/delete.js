db = connect( 'mongodb://localhost:27017' );

db.air_bnb.deleteMany({
  "price": { $lt: "20.00" },
  "bedrooms": { $gte: 2 }
})