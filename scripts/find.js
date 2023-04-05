db = connect( 'mongodb://localhost:27017' );

db.air_bnb.find({
  price: { $lt: 200.00 }
})

db.air_bnb.find({
  price: { $lt: 105.00, $gt: 100.00 }
})

db.air_bnb.find(
  {
    price: {
     $lt: 200
    },
    amenities: {
     $all: [
      'Wifi',
      'TV'
     ]
    },
    'address.country': 'United States'
   }
)

db.air_bnb.find({
    property_type: 'Apartment',
    last_review: {
     $gt: ISODate('2017-01-01T00:00:00.000Z')
    }
  }
)