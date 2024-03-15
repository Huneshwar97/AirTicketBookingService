const {BookingRepository} = require('../repository/index');

const axios = require('axios');


const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/index');

class BookingService {
    constructor() {
        this.bookingRepository =  new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in the flights')
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingpayload = {...data,totalCost};
            const booking = await this.bookingRepository.create(bookingpayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id,{status:"Booked"});
            return finalBooking;


        } catch (error) {
            if(error.name == 'RepsoitoryError' || error.name == 'ValidationError')
            throw new ServiceError();
        }
    }

    
}

module.exports = BookingService;
