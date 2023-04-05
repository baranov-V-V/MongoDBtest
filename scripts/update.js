db = connect( 'mongodb://localhost:27017' );

db.air_bnb.updateMany(
  { price: { $gt: 150 } },
  { $push: { amenities: "kettle" } }
  )

db.air_bnb.updateMany(
  { "amenities": "Wifi" },
  { $inc: { "price": 5 } }
)