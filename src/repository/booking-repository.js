const {StatusCode} = require('http-status-code');
const { Booking } = require('../models/index');
const { AppError,ValidationError } = require('../utils/index');

class BookingRepository {
    async create(data){
        try {
          const booking = Booking.create(data);
          return booking;  
        } catch (error) {
            if(error.name == 'SequelizevalidationError'){
                throw new ValidationError (error)
            }
            throw new AppError('Repsoitory Error',
            'cannot create Booking',
            'There was some issue creating the booking , please try again',
            StatusCode.INTERAL_SERVER_ERROR)
        }
    }

    async update(bookingId,data){
        try {
          const booking = Booking.update(data);
          return booking;  
        } catch (error) {
            if(error.name == 'SequelizevalidationError'){
                throw new ValidationError (error)
            }
            throw new AppError('Repsoitory Error',
            'cannot create Booking',
            'There was some issue creating the booking , please try again',
            StatusCode.INTERAL_SERVER_ERROR)
        }
    }
}