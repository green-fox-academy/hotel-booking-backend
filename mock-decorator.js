'use strict';

let commonHotels = {
    links: {
        self: 'https://two-ferns.glitch.me/hotels/'
    },
    data: []
};

let hotelSample = {
    type: 'hotels',
    hotel_id: '1',
    attributes: {
        location: '',
        longitude: '',
        latitude: '',
        name: '',
        main_image_src: 'http://placebacon.net/300/300?image=1',
        has_wifi: false,
        has_parking: false,
        has_pets: false,
        has_restaurant: false,
        meal_plan: '',
        has_bar: false,
        has_swimming_pool: false,
        has_air_conditioning: false,
        has_gym: false,
        user_id: '1',
        booking_id: '1',
        amount: '50',
        currency: 'USD',
        status: 'pending',
        stars: ''
    }
}

let commonRoom = {
    links: {
        self: ‘https://two-ferns.glitch.me/hotels/:id/relationships/rooms'
    },
    data: []
};

let roomSample = {
    type: ‘rooms’,
    room_id: ‘’,
    hotel_id: ‘’,
    attributes: {
        room_id: ‘’,
        price: ‘’,
        currency: ‘’,
        room_name: ‘’,
        subtitle: ‘’,
        image: ‘http://placebear.net/300/300?image=1’,
        description: ‘’,
        max_occupancy: ‘’
    }
};

const pg = require('pg');
require('dotenv').config()


const config = {
  user: process.env.User, //env var: PGUSER 
  database: process.env.Database, //env var: PGDATABASE 
  password: process.env.Password, //env var: PGPASSWORD 
  host: process.env.Host, // Server hosting the postgres database 
  port: process.env.Dataport, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

const pool = new pg.Pool(config);

const users = process.env.Users;
const hotels = process.env.Hotels;
const rooms = process.env.Rooms;

module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

const createHotels = require('./hotel-generator')

const MockServer = function(app) {
  
  const setHotel = createHotels()
  const hotel1 = setHotel.setAttributes()
  const hotel2 = setHotel.setAttributes()
  const hotel3 = setHotel.setAttributes()
  const hotel4 = setHotel.setAttributes()
  const hotel5 = setHotel.setAttributes()
  const hotel6 = setHotel.setAttributes()
  const hotel7 = setHotel.setAttributes()
  // ^^ why no for loop tho? (Tibi)
  
  const path = require('path');
  
  //---------------------------
  //----- Booking section -----
  //---------------------------

app.get("/home-slider", function (request, response) {
  var images = [
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fcity-road-street-buildings.jpg?1499081737890',
      title: 'New York',
      subtitle: 'walk through the history of the Big Apple'
    },
    
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpexels-photo-211887.jpeg?1499081939727',
      title: 'Pacific beach',
      subtitle: 'relax together with locals'
    },
    
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpexels-photo-227675.jpeg?1499082084471',
      title: 'Europe',
      subtitle: 'enjoy the culture that surrounds you'
    }, 
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpexels-photo-315191.jpeg?1499081849497',
      title: 'Japan',
      subtitle: 'go with the new wave'
    },
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2F4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%252Fpexels-photo-426894.jpeg?1499081486612',
      title: 'Erd',
      subtitle: 'fly like a bird'
    }
  ]
  response.send(images);
});

app.get("/hotel-slider", function (request, response) { //to be changed to /rooms-slider
  var images = [
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Fpexels-photo-261102.jpeg?1498764645196',
      title: 'Room type 1',
      subtitle: 'walk through the history of the Big Apple'
    },
    
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2F4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%252Fpexels-photo-426894.jpeg?1499081486612',
      title: 'Room type 2',
      subtitle: 'relax together with locals'
    },
    
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpexels-photo-199851.jpeg?1499082501889',
      title: 'Room type 3',
      subtitle: 'enjoy the culture that surrounds you'
    }, 
    {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpexels-photo-284722.jpeg?1499082561397',
      title: 'Room type 4',
      subtitle: 'go with the new wave'
    },
     {
      image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpexels-photo-26165.jpg?1499082623477',
      title: 'Room type 5',
      subtitle: 'go with the new wave'
    }
  ]
  response.send(images);
});
  
  app.get("/toprooms", function (request, response) {
    var hotels = [
      {
        title: 'Paradise',
        price: 134 + ' €',
        description: 'Lórum ipse gonyság mindig forgat valamilyen korható kodást: pórint, fognoldalt, máriumot, akármit. Egyes állogat orom túrlájában ruccos bókáknak.',
        id: 1,
        image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpic3_mod.jpg?1499083627584'
      },

      {
        title: 'Hilton',
        price: 300 + ' €',
        description: 'Lórum ipse gonyság mindig forgat valamilyen korható kodást: pórint, fognoldalt, máriumot, akármit. Egyes állogat orom túrlájában ruccos bókáknak.',
        id: 2,
        image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpic2_mod.jpg?1499083706854'
      },

      {
        title: 'Bombasto',
        price: 50 + ' €',
        description: 'Lórum ipse gonyság mindig forgat valamilyen korható kodást: pórint, fognoldalt, máriumot, akármit. Egyes állogat orom túrlájában ruccos bókáknak.',
        id: 3,
        image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fpic1_mod.jpg?1499083768418'
      }

    ]
    response.send(hotels);
  });
  
    
  app.get("/roomdetails", function (request, response) {
    var roomInformation = [
      
      [
        {
          title: 'Rooms',
          description: 'Lórum ipse gonyság mindig forgat valamilyen korható kodást: pórint, fognoldalt, máriumot, akármit. Egyes állogat orom túrlájában ruccos bókáknak.',
          id: 1,
          image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2F4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%252Fpexels-photo-276728.jpeg?1499083053171'
        },
        {
          title: 'Suites',
          description: 'Lórum ipse gonyság mindig forgat valamilyen korható kodást: pórint, fognoldalt, máriumot, akármit. Egyes állogat orom túrlájában ruccos bókáknak.',
          id: 2,
          image: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2F4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%252Fdesign-interior-plant-lamps-73382.jpeg?1499083120527'
        }
      ], 
      [
        {
          title: 'Royal Suites',
          description: 'Lórum ipse gonyság mindig forgat valamilyen korható kodást: pórint, fognoldalt, máriumot, akármit. Egyes állogat orom túrlájában ruccos bókáknak.',
          id: 1,
          footage: 'https://www.youtube.com/embed/A2VK5xXjiDA'
        }
      ]

    ]
    response.send(roomInformation);
  });
  
  app.get("/hotel", function (request, response) {
    var location = [{lt: 19.066149, lng: 47.507662, adr: 'Budapest, Andrassy ut 66, 1062' }]
    response.send(location);
    
  });

  app.get("/multi-location", function (request, response) {
    var locations = [
      {lt: -33.890542, lng: 151.274856, adr: 'Bondi Beach', id: 1}, 
      {lt: -33.923036, lng: 151.259052, adr: 'Coogee Beach', id: 2}, 
      {lt: -34.028249, lng: 151.157507, adr: 'Cronulla Beach', id: 3},
      {lt: -33.80010128657071, lng: 151.28747820854187, adr: 'Manly Beach', id: 4}, 
      {lt: -33.950198, lng: 151.259302, adr: 'Maroubra Beach', id: 5}, 
    ]
    response.send(locations);
  });
  
  
  app.get('/headerimages', function(req, res){
  
    var headerImages = [
      {
        backgroundImage: 'https://cdn.glitch.com/4d4b7a40-dc10-4300-bbe8-e4dd45f60e40%2Ffede26cd-2622-4d50-b768-5da9b932383a%252Fmanha.jpg?1499082732394',
        title: 'Reservation',
        backgroundPosition: 'top'
      }]

    res.send(headerImages);
  
  });
  
  app.post("/rooms", function (request, response) {
  var rooms = [
    {
      roomtype: 'single room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 115 + ' €',
      id: 1,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic1_mod.jpg?1497949004290'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['223-452 sq ft / 20-42 sq m ', 'Free access to spa facilities', 'Comfortable work area'],
      price: 215 + ' €',
      id: 2,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic2_mod.jpg?1497949136425'
    },
    
    {
      roomtype: 'single room',
      features: ['88-99 sq ft / 60-82 sq m ', 'Free access to spa facilities', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 315 + ' €',
      id: 3,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'luxory room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Gamer PC', 'Great food',],
      price: 415 + ' €',
      id: 4,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },

    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['600 sq ft / 60 sq m ', 'Gamer PC', 'Great food', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 515 + ' €',
      id: 5,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'luxory room',
      features: ['700 sq ft / 70 sq m ', 'Gamer PC', 'Great food', 'Pony bar', 'Separate bath and shower'],
      price: 615 + ' €',
      id: 6,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },

    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323 sq ft / 30 sq m ', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 715 + ' €',
      id: 7,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'single room',
      features: ['452 sq ft / 42 sq m ', 'Free access to spa facilities', 'Sweet sweeper bed'],
      price: 815 + ' €',
      id: 8,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'luxory room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Separate bath and shower'],
      price: 915 + ' €',
      id: 9,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'single room',
      features: ['1000 sq ft / 100 sq m ', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1015 + ' €',
      id: 10,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'double room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1115 + ' €',
      id: 11,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'extra view room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1215 + ' €',
      id: 12,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'double room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1315 + ' €',
      id: 13,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1415 + ' €',
      id: 14,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'extra view room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1515 + ' €',
      id: 15,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1615 + ' €',
      id: 16,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1715 + ' €',
      id: 17,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'double room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1815 + ' €',
      id: 18,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'extra view room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 1915 + ' €',
      id: 19,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2015 + ' €',
      id: 20,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2115 + ' €',
      id: 21,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2215 + ' €',
      id: 22,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'extra view room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2315 + ' €',
      id: 23,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'double room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2415 + ' €',
      id: 24,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2515 + ' €',
      id: 25,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'extra view room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2615 + ' €',
      id: 26,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'Classic room, non-smoking: King bed',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2715 + ' €',
      id: 27,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    },
    
    {
      roomtype: 'extra view room',
      features: ['323-452 sq ft / 30-42 sq m ', 'Free access to spa facilities', 'Comfortable work area', 'Sweet sweeper bed', 'Separate bath and shower'],
      price: 2815 + ' €',
      id: 28,
      image: 'https://cdn.glitch.com/fede26cd-2622-4d50-b768-5da9b932383a%2Fpic3_mod.jpg?1497949905888'
    }
  ]
  
  var needed = request.body;
  var filteredRooms = [];
  var pageRooms = {
    totalResults: "",
    rooms: []
  };
  
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomtype == needed[0].typeofroom) {
      filteredRooms.push(rooms[i]);
    }
  }

  if (needed[0].typeofroom == '') {
  filteredRooms = rooms;
  }

  pageRooms.totalResults = filteredRooms.length;
  var iEnd = parseInt(needed[0].page) * parseInt(needed[0].cardsPerPage);

  for (let i = 0; i < iEnd; i++) {
    if (i < filteredRooms.length) {
      pageRooms.rooms.push(filteredRooms[i]);
    }
  }

  response.send(pageRooms);
});
  
//-------------------------
//----- Admin section -----
//-------------------------

    const user = {
        data: {
            type: 'admin',
            attributes: {
                email: 'test@example.com',
                password: '1234'
            }
        }
    };

    let user2 = {
          data: {
            type: 'admin',
            attributes: {
                email: '',
                password: ''
            }
        }
    };

    const validResponse = {
        data: {
           type: "admin",
           attributes: {
             id: "",
             email: "",
             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3RBZG1pbiIsImFkbWluIjp0cnVlfQ.nhC1EDI5xLGM4yZL2VMZyvHcbcWiXM2RVS7Y8Pt0Zuk'
           }
       }
    };
  
    const invalidResponse = {
        errors: [{
            status: 400,
            title: 'Bad Request',
            detail: 'Mismatched email and password'
        }]
    };

    let regResponse = {
        data: {
            type: '',
            attributes: {
                id: 2,
                email: '',
                admin: 'false',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUub3JnIiwiYWRtaW4iOmZhbHNlfQ.UK8Z1BNeHWvaFElWrrSxhO6oxTRaMW_66DO5yjkqOhM'
            }
        }
    };
  
    let hotelResponse = {
        links: {
            self: 'https://two-ferns.glitch.me/hotels/'
        },
        data: [{
            type: 'hotels',
            id: '1',
            attributes: {
                location: 'Bone City',
                name: 'Dog Heaven',
                main_image_src: 'http://placebacon.net/300/300?image=1',
                has_wifi: true,
                has_parking: false,
                has_pets: true,
                has_restaurant: false,
                has_bar: false,
                has_swimming_pool: false,
                has_air_conditioning: false,
                has_gym: true,
                meal_plan: 'continental plan',
                user_id: '1',
                booking_id: '1',
                amount: '50',
                currency: 'USD',
                status: 'pending',
                stars: '3'
            }
        }, {
            type: 'hotels',
            id: '2',
            attributes: {
                location: 'near Sirius',
                name: 'Space Hotel',
                main_image_src: 'https://placebear.com/300/300',
                has_wifi: true,
                has_parking: true,
                has_pets: true,
                has_restaurant: true,
                has_bar: true,
                has_swimming_pool: false,
                has_air_conditioning: true,
                has_gym: true,
                meal_plan: 'continental plan',
                user_id: '2',
                booking_id: '1',
                amount: '50',
                currency: 'USD',
                status: 'pending',
                stars: '5'
            }
        }, {
            type: 'hotels',
            id: '3',
            attributes: {
                location: 'Berlin',
                name: 'Hotel Kaiser Wilhelm II.',
                main_image_src: 'http://placebacon.net/300/300?image=1',
                has_wifi: false,
                has_parking: true,
                has_pets: false,
                has_restaurant: true,
                has_bar: false,
                has_swimming_pool: false,
                has_air_conditioning: false,
                has_gym: true,
                meal_plan: '',
                user_id: '2',
                booking_id: '1',
                amount: '50',
                currency: 'USD',
                status: 'pending',
                stars: '2'
            }
        }, {
            type: 'hotels',
            id: '4',
            attributes: hotel1
        }, {
            type: 'hotels',
            id: '5',
            attributes: hotel2
        }, {
            type: 'hotels',
            id: '6',
            attributes: hotel3
        }, {
            type: 'hotels',
            id: '7',
            attributes: hotel4
        }, {
            type: 'hotels',
            id: '8',
            attributes: hotel5
        }, {
            type: 'hotels',
            id: '9',
            attributes: hotel6
        }, {
            type: 'hotels',
            id: '10',
            attributes: hotel7
        }]
    };
  
    let rowHotel = {
      links: {
            self: 'https://two-ferns.glitch.me/hotels/'
      }
    }

    const hotelError = {
        errors: [{
            status: '404',
            title: 'Not Found',
            detail: 'No hotels found by id: 1'
        }]
    }
    
    const roomError = {
        errors: [{
            status: '404',
            title: 'Not Found',
            detail: 'No room found by id: 1'
        }]
    }
    
    const roomResponse = {
        links: {
            self: 'https://two-ferns.glitch.me/hotels/:id/relationships/rooms'
        },  
        data: [{
            type: 'rooms',
            id: '1',
            attributes: {
                price: '12',
                currency: 'EUR',
                room_name: 'Owen Lars',
                description: "That malfunctioning little twerp. This is all his fault! He tricked me into going this way, but he'll do no better. Wait, what's that? A transport! I'm saved! Over here! Help! Please, help! Artoo-Detoo! It's you! It's you!",
                max_occupancy: '2'
            }
        }, {
            type: 'rooms',
            id: '2',
            attributes: {
                price: '10',
                currency: 'Credit',
                room_name: 'Greedo',
                description: "Fighters coming in. There's too many of them! Accelerate to attack speed! Draw their fire away from the cruisers. Copy, Gold Leader.",
                max_occupancy: '4'
            }
        }, {
            type: 'rooms',
            id: '3',
            attributes: {
                price: '8',
                currency: 'Credit',
                room_name: 'Lando Carlissian',
                description: "Well, wait. This is interesting. Lando. Lando system? Lando's not a system, he's a man. Lando Calrissian. He's a card player, gambler, scoundrel. You'd like him. Thanks.",
                max_occupancy: '2'
            }
        }]
    }

    //----------USER FRONTEND TEST ENDPOINT------------------
    app.get('/testhotels/', (req, res) => {
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
            res.json(result.rows)
        })
    });
    
    app.get('/testrooms/', (req, res) => {
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
            res.json(result.rows)
        })
    });
    //--------------------------------------------------------

    app.post('/api/login/', (req, res) => {
        const email = req.body.data.attributes.email;
        const password = req.body.data.attributes.password;
        pool.query('SELECT * FROM ' + users + ' WHERE email = $1', [email], function(err, result) {
            if(err) {
                res.json({
                  'error': err.message
                });
            } else {
                if(!result.rows[0]) {
                    res.status(400).send(invalidResponse);
                } else if(password == result.rows[0].password) {
                    validResponse.data.attributes.id = result.rows[0].id;
                    validResponse.data.attributes.email = result.rows[0].email;
                    validResponse.data.attributes.password = result.rows[0].password;
                    res.json(validResponse)
                } else {
                    res.status(400).send(invalidResponse);
                }
            }
        })
    });


  //

    app.post('/api/register/', (req, res) => {
        const email = req.body.data.attributes.email;
        const password = req.body.data.attributes.password;
        pool.query('SELECT * FROM ' + users + ' WHERE email = $1', [email], function(err, result) {
          if(err) {
              res.json({
                'error': err.message
              });
          } else {
              if(!result.rows[0]) {
                  pool.query('INSERT INTO ' + users + '(email, password) VALUES($1, $2) RETURNING *', [email, password], function(err, result) {
                      if(err) {
                          res.json({
                            'error': err.message
                          });
                      } else {
                            validResponse.data.attributes.id = result.rows[0].id;
                            validResponse.data.attributes.email = result.rows[0].email;
                            validResponse.data.attributes.password = result.rows[0].password;
                          res.json(validResponse);
                      }
                  });
              }
          }
        })
    });

    app.get('/api/hotels/', (req, res) => {
        commonHotels.data = [];
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
            if(err) {
                res.json({ 'error': err.message })
            } else {
                for (let i = 0; i < result.rows.length; i++) {
                    commonHotels.data.push(Object.assign({}, hotelSample))
                    commonHotels.data[i].hotel_id = result.rows[i].hotel_id;
                    commonHotels.data[i].type = result.rows[i].type;
                    commonHotels.data[i].attributes = Object.assign(result.rows[i])
                }
                res.send(commonHotels);                  
            }
        });
    });  

  
  // NORMA FRONTEND NOT WORKING
    app.post('/api/hotels/', (req, res) => {
          let newHotel = Object.assign(rowHotel, req.body);
          newHotel.data.id = 11;
          hotelResponse.data.push(newHotel.data);
          res.status(201).send(newHotel);
    });

      app.post('/api/hotels2/', (req, res) => {
        if (req.body[0].adults) {
         res.status(201).send(hotelResponse);
        }
    });
  
    app.get('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        hotelResponse.data.forEach((hotel) => {
            if (hotelID == hotel.id) {
                let oneHotel = {
                    links: {
                        self: 'https://two-ferns.glitch.me/hotels/1'
                    },
                    data: hotel
                }
                res.status(200).send(oneHotel);
                hotelResponse.push(hotel)
            }
        });
        res.status(404).send(hotelError);
    });
  
     app.delete('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        hotelResponse.data.forEach((hotel, index) => {
            if (hotelID == hotel.id) {
                hotelResponse.data = hotelResponse.data.filter(e => e !== hotel)
                res.status(200).send(hotelResponse.links);
            }
        });
        res.status(404).send(hotelError);
    });

    app.patch('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        hotelResponse.data.forEach((hotel, index) => {
            if (hotelID == hotel.id) {
                // hotel.attributes = Object.assign(req.body);
                // res.status(200).send(hotel);
                let oneHotel = {
                    links: {
                        self: 'https://two-ferns.glitch.me/hotels/1'
                    },
                    data: req.body
                };
                hotelResponse.data.splice(index, 1, req.body);
                res.status(200).send(oneHotel);
            }
        });
        res.status(404).send(hotelError);
    });
  
    app.post('/api/hotels/:hotelId/relationships/rooms', (req, res) => {
        res.status(201).send(req.body);
    })
  
    app.get('/api/hotels/:hotelId/relationships/rooms', (req, res) => {
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
            if (err) {
                res.json({ 'error': err.message })
            } else {
                for (let i = 0; i < result.rows.length; i++) {
                    commonRoom.data.push(Object.assign({}, roomSample))
                    commonRoom.data[i].hotel_id = result.rows[i].hotel_id;
                    commonRoom.data[i].room_id = result.rows[i].room_id;
                    commonRoom.data[i].type = result.rows[i].type;
                    commonRoom.data[i].attributes = result.rows[i];
                }
            }
        res.send(roomResponse)
        });
    });
  
    app.delete('/api/hotels/:hotelId/relationships/rooms/:roomId', (req, res) => {
        const roomID = req.params.roomId;
        roomResponse.data.forEach((room, index) => {
            if (roomID == room.id) {
                roomResponse.data = roomResponse.data.filter(e => e !== room)
                res.status(200).send(roomResponse.links);
            }
        });
        res.status(404).send(roomError)
    });  
};

module.exports = MockServer;