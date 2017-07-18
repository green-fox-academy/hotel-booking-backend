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

let commonRooms = {
    links: {
        self: 'https://two-ferns.glitch.me/hotels/:id/relationships/rooms'
    },
    data: []
};

let roomSample = {
    type: 'rooms',
    room_id: '',
    hotel_id: '',
    attributes: {
        room_id: '',
        price: '',
        currency: '',
        room_name: '',
        subtitle: '',
        image: 'http://placebear.net/300/300?image=1',
        description: '',
        max_occupancy: ''
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

    //----------USER FRONTEND NEW ENDPOINTS------------------
    app.get('/testhotels/', (req, res) => { //works
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
            res.json(result.rows)
        })
    });
    
    app.get('/testrooms/', (req, res) => { //works
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
            res.json(result.rows)
        })
    });

	function compare(a,b) {
		if (a.stars < b.stars)
			return -1;
		if (a.stars > b.stars)
			return 1;
		return 0;
	};

	app.get('/toprooms', (req, res) => { //works
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				console.log('this is toprooms')
				let responseObject = {
					data: []
				}
				let topThree = result.rows.sort(compare).slice(0,3);
				topThree.forEach(el => {
					let topHotel = {
					image: el.image,
					name: el.room_name,
					price: el.price,
					desription: el.decription
					}
					responseObject.data.push(topHotel)
				})
				res.json(responseObject)
			}
        })
    });

	app.get('/roomdetails', (req, res) => { //works
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				let responseObject = {
					data: []
				}
				result.rows.forEach(el => {
					roomDetail = {
						title: el.room_name,
						description: el.decription,
						id: el.room_id
					}
					responseObject.data.push(roomDetail)
				})
				res.json(responseObject)
			}
		})
    });

	app.get('/mapsearch', (req, res) => {
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				let responseObject = {
					data: []
				}
				result.rows.forEach(el => {
					locData = {
						latitude: el.latitude,
						longitude: el.longitude,
						name: el.name,
						id: el.hotel_id
					}
					responseObject.data.push(locData)
				})
				res.json(responseObject)
			}
		})
    });

	app.get('/roomfeatures/:id', (req, res) => {
		const roomId = req.params.id;
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				let responseObject = {
					data: []
				}
				result.rows.forEach(el => {
					if (roomId === el.room_id) {
						let featureData = {
							data: {
								has_wifi: el.has_wifi,
								has_parking: el.has_parking,
								has_pets: el.has_pets,
								has_restaurant: el.has_restaurant,
								has_bar: el.has_bar,
								has_swimming_pool: el.has_swimming_pool,
								has_air_conditioning: el.has_air_conditioning,
								has_gym: el.has_gym,
							}
						}
					responseObject.data.push(featureData)
					}			
				})	
				res.json(responseObject)	
			}
		})
    });

	app.get('/hotel-slider', (req, res) => { //works
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				let responseObject = {
					data: []
				}
				result.rows.forEach(el => {
					hotelImage = {
					image: el.main_image_src,
					title: el.name,
					subtitle: el.location,
					}
					responseObject.data.push(hotelImage)
				})
				res.json(responseObject)
			}
		})
    });

	app.get('/room-slider', (req, res) => {
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				let responseObject = {
					data: []
				}
				result.rows.forEach(el => {
					roomImage = {
					image: el.image,
					title: el.room_name,
					subtitle: el.subtitle,
					}
					responseObject.data.push(roomImage)
				})
				res.json(responseObject)
			}
		})
    });

	app.get('/hotel-search', (req, res) => {
        pool.query('SELECT * FROM ' + hotels, function(err, result) {
			if(err) {
                res.json({
                  'error': err.message
                });
			} else {
				let responseObject = {
					data: []
				}
				result.rows.forEach(el => {
					hotelData = {
					type: el.type,
					attributes: {
						hotel_id: el.hotel_id,
						location: el.location,
						longitude: el.longitude,
						latitude: el.latitude,
						name: el.name,
						main_image_src: el.main_image_src,
						has_wifi: el.has_wifi,
						has_parking: el.has_parking,
						has_pets: el.has_pets,
						has_restaurant: el.has_restaurant,
						has_bar: el.has_bar,
						has_swimming_pool: el.has_swimming_pool,
						has_air_conditioning: el.has_air_conditioning,
						has_gym: el.has_gym,
						meal_plan: el.meal_plan,
						user_id: el.user_id,
						booking_id: el.booking_id,
						amount: el.amount,
						currency: el.currency,
						status: el.status,
						stars: el.stars
						}
					}
					responseObject.data.push(hotelData)
				})
				res.json(responseObject)
			}
				
		})
	})


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
                res.send({ 'error': err.message })
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
        const has_wifi = req.body.data.attributes.has_wifi;
        const has_parking = req.body.data.attributes.has_parking;
        const has_pets = req.body.data.attributes.has_pets;
        const has_restaurant = req.body.data.attributes.has_restaurant;
        const has_bar = req.body.data.attributes.has_bar;
        const has_swimming_pool = req.body.data.attributes.has_swimming_pool;
        const has_air_condition = req.body.data.attributes.has_air_condition;
        const has_gym = req.body.data.attributes.has_gym;
        const name = req.body.data.attributes.name;
        const meal_plan = req.body.data.attributes.meal_plan;
        const stars = req.body.data.attributes.stars;
        const location = req.body.data.attributes.location;
        const main_image_src = req.body.data.attributes.main_image_src;
        const columns = ' (has_wifi, has_parking, has_pets, has_restaurant, has_bar, has_swimming_pool, has_air_conditioning, has_gym, name, meal_plan, stars, location, main_image_src)';
        const values = ' VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
        const valueList = [has_wifi, has_parking, has_pets, has_restaurant, has_bar, has_swimming_pool, has_air_condition, has_gym, name, meal_plan, stars, location, main_image_src]
        pool.query('INSERT INTO ' + hotels + columns + values + ' RETURNING *', valueList, function(err, result) {
            if(err) {
                res.send({
                    'error': err.message
                });
            } else {
                res.json('alma');
            }
        });
    });


    // app.post('/api/hotels/', (req, res) => {
    //       let newHotel = Object.assign(rowHotel, req.body);
    //       newHotel.data.id = 11;
    //       hotelResponse.data.push(newHotel.data);
    //       res.status(201).send(newHotel);
    // });

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
        pool.query('DELETE FROM ' + hotels +' WHERE hotel_id = $1', [hotelID]), function(err, result) {
            if(err) {
                res.send({
                'error': err.message
                }); 
            } else {
                res.send('alma')
            }
        }
        res.send('bela')
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
        commonRooms.data = [];
        pool.query('SELECT * FROM ' + rooms, function(err, result) {
            if (err) {
                res.json({ 'error': err.message })
            } else {
                for (let i = 0; i < result.rows.length; i++) {
                    commonRooms.data.push(Object.assign({}, roomSample))
                    commonRooms.data[i].hotel_id = result.rows[i].hotel_id;
                    commonRooms.data[i].room_id = result.rows[i].room_id;
                    commonRooms.data[i].type = result.rows[i].type;
                    commonRooms.data[i].attributes = result.rows[i];
                }
            res.send(commonRooms);
            }
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