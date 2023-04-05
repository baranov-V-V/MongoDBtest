db = connect( 'mongodb://localhost:27017' );

db.air_bnb.insertOne(
  {
    "_id": "999666",
    "listing_url": "https://2ka.mipt.ru/",
    "name": "Obshaga dvoyka",
    "summary": "prekrasnoye mesto dlya prozivania",
    "bed_type": "2-floor ben",
    "minimum_nights": "365",
    "maximum_nights": "365",
    "amenities": [
      "Window",
      "Table",
      "Closet"
    ],
    "price": {
      "$numberDecimal": "1.00"
    }
  }  
)
