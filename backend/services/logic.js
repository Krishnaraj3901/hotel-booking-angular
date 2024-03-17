//import db
const { response } = require("express");
const db = require("./db");

//logic for register

const register = async (username, phno, password) => {
  const response = await db.User.findOne({ phno });
  console.log(response);
  if (response) {
    return {
      statusCode: 401,
      message: "phno is already registered",
    };
  } else {
    const newUser = new db.User({
      username,
      phno,
      password,
    });
    newUser.save();
    //response back to client
    return {
      statusCode: 200,
      message: "Registration successful",
    };
  }
};

//logic for login

const login = (phno, password) => {
  return db.User.findOne({ phno, password }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        message: "login successful",
        response,
      };
    } else {
      return {
        statusCode: 401,
        message: "invalid login",
      };
    }
  });
};

const rooms = () => {
  return db.Room.find().then((result) => {
    if (result) {
      return {
        statusCode: 200,
        message: "available rooms",
        rooms: result,
      };
    } else {
      return {
        statusCode: 401,
        message: "could not find any rooms",
      };
    }
  });
};

const bookings = (
  fullname,
  checkin,
  checkout,
  adult,
  children,
  email,
  phno,
  roomId
) => {
  return db.Booking.find().then((response) => {
    let newBooking = new db.Booking({
      fullname,
      checkin,
      checkout,
      adult,
      children,
      email,
      phno,
      roomId,
    });
    newBooking.save();
    //response back to client
    return {
      statusCode: 200,
      message: "booking details successful",
      response,
    };
  });
};

const booked = (roomId) => {
  return db.AllRoom.findOne({ roomId }).then((selectRoom) => {
    if (selectRoom) {
      return {
        statusCode: 200,
        message: "room fetched successfull",
        selectedRoom: selectRoom,
      };
    } else {
      return {
        statusCode: 401,
        message: "cannot fetch",
      };
    }
  });
};

const checkOut = (checkin, roomId) => {
  return db.Booking.findOne({ checkin, roomId }).then((bookDetails) => {
    if (bookDetails) {
      return {
        statusCode: 200,
        message: "booking details fetched successfull",
        bookDetails: bookDetails,
      };
    } else {
      return {
        statusCode: 401,
        message: "cannot fetch details",
      };
    }
  });
};

const confirmed = (
  fullname,
  checkin,
  checkout,
  adult,
  children,
  email,
  phno,
  roomId
) => {
  return db.Confirm.find({ checkin, roomId }).then(() => {
    const newConfirmed = new db.Confirm({
      fullname,
      checkin,
      checkout,
      adult,
      children,
      email,
      phno,
      roomId,
    });

    return newConfirmed
      .save()
      .then(() => {
        return db.Room.findOne({ roomId }).then((roomResponse) => {
          if (!roomResponse) {
            throw new Error(`Room with id ${roomId} not found.`);
          }
          const roomBooked = new db.RoomBooked({
            ...roomResponse.toObject(),
            checkin,
            checkout,
          });

          return roomBooked.save().then(() => {
            return db.Room.deleteOne({ roomId }).then((deleteResponse) => {
              // response back to client
              return {
                statusCode: 200,
                message: "Room has been removed successfully",
                deleteResponse,
              };
            });
          });
        });
      })
      .then((result) => {
        return {
          statusCode: 200,
          message: "Confirmed details successful",
          result,
        };
      });
  });
};

const history = (phno) => {
  return db.Confirm.find({ phno }).then((historyDetails) => {
    if (historyDetails) {
      return {
        statusCode: 200,
        message: "booking history fetched successfull",
        historyDetails,
      };
    } else {
      return {
        statusCode: 401,
        message: "cannot fetch history",
      };
    }
  });
};

module.exports = {
  register,
  login,
  rooms,
  bookings,
  booked,
  checkOut,
  confirmed,
  history,
};
