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
        pool.query('SELECT * FROM ' + hotels, (err, result) => {
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
        const has_air_condition = req.body.data.attributes.has_air_conditioning;
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

      app.post('/api/hotels2/', (req, res) => {
        if (req.body[0].adults) {
         res.status(201).send(hotelResponse);
        }
    });

    app.get('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        let response = {data:{}};
        pool.query('SELECT * FROM ' + hotels + ' WHERE hotel_id = $1', [hotelID], function(err, result) {
            if(err) {
                res.send({ 'error': err.message })
            } else {
                response.data = (Object.assign({}, hotelSample))
                response.data.hotel_id = result.rows[0].hotel_id;
                response.data.type = result.rows[0].type;
                response.data.attributes = Object.assign(result.rows[0])
                res.send(response);
            }
        });
    });

     app.delete('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        pool.query('DELETE FROM ' + hotels +' WHERE hotel_id = $1', [hotelID]), function(err, result) {
            if(err) {
                res.json({
                'error': err.message
                });
            } else {
                res.json({
                    'status': 'ok'
                })
            }
        }
        res.json({
            'status': 'ok'
        })
    });

    app.patch('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        const has_wifi = req.body.data.attributes.has_wifi;
        const has_parking = req.body.data.attributes.has_parking;
        const has_pets = req.body.data.attributes.has_pets;
        const has_restaurant = req.body.data.attributes.has_restaurant;
        const has_bar = req.body.data.attributes.has_bar;
        const has_swimming_pool = req.body.data.attributes.has_swimming_pool;
        const has_air_condition = req.body.data.attributes.has_air_conditioning;
        const has_gym = req.body.data.attributes.has_gym;
        const name = req.body.data.attributes.name;
        const meal_plan = req.body.data.attributes.meal_plan;
        const stars = req.body.data.attributes.stars;
        const location = req.body.data.attributes.location;
        const main_image_src = req.body.data.attributes.main_image_src;
        let response = {data:{}};
        const columns = 'has_wifi = $1, has_parking = $2, has_pets = $3, has_restaurant = $4, has_bar = $5, has_swimming_pool = $6, has_air_conditioning = $7, has_gym = $8, name = $9, meal_plan = $10, stars = $11, location = $12, main_image_src = $13 ';
        //const values = ' VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
        const valueList = [has_wifi, has_parking, has_pets, has_restaurant, has_bar, has_swimming_pool, has_air_condition, has_gym, name, meal_plan, stars, location, main_image_src, hotelID]
        // pool.query('UPDATE ' + hotels + 'SET ' + columns + ' RETURNING *', valueList, function(err, result) {
        pool.query('UPDATE ' + hotels + ' SET '+ columns  + ' WHERE hotel_id = $14', valueList, function(err, result) {
            if(err) {
                res.json({
                    'error': err.message
                });
            } else {
                res.json({
                    'status': 'ok'
                })
            }
        });
    });

    app.post('/api/hotels/:hotelId/relationships/rooms', (req, res) => {
        const type = req.body.data.type;
        const hotel_id = req.body.data.id;
        const price = req.body.data.attributes.price;
        const currency = req.body.data.attributes.currency;
        const room_name = req.body.data.attributes.room_name;
        const subtitle = req.body.data.attributes.subtitle;
        const image = req.body.data.attributes.image;
        const description = req.body.data.attributes.description;
        const max_occupancy = req.body.data.attributes.max_occupancy;
        
        const columns = ' (type, hotel_id, price, currency, room_name, subtitle, image, description, max_occupancy)';
        const values = ' VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        const valueList = [type, hotel_id, price, currency, room_name, subtitle, image, description, max_occupancy];
        pool.query('INSERT INTO ' + rooms + columns + values + ' RETURNING *', valueList, function(err, result) {
            if(err) {
                res.send({
                    'error': err.message
                });
            } else {
                res.json('ok');
            }
        });
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
