const express = require("express");

//import cors
const cors = require("cors");

const logic = require("./services/logic");

const db = require("./services/db");

const cron = require("node-cron");

//create a server using express
const server = express();

//use cors
server.use(
  cors({
    origin: "http://localhost:4200",
  })
);

server.use(express.json());

//port for server
server.listen(5000, () => {
  console.log("server listening on port 5000");
});

//api call
server.get("/", (req, res) => {
  res.send("welcome to backend");
});

server.post("/", (req, res) => {
  console.log("server post");
});

//register

server.post("/register", (req, res) => {
  console.log("Inside register api call");
  console.log(req.body);
  //logic for register
  logic
    .register(req.body.username, req.body.phno, req.body.password)
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});
//login

server.post("/login", (req, res) => {
  console.log("inside login api call");
  console.log(req.body);

  //logic for login
  logic.login(req.body.phno, req.body.password).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

//room select and book

server.get("/rooms", (req, res) => {
  console.log("inside rooms api call");
  console.log(req.body);

  //logic
  logic.rooms().then((response) => {
    res.status(response.statusCode).json(response);
  });
});

//booking fetch

server.get("/checkin/:roomId", (req, res) => {
  console.log("inside checkin api call");
  //logic
  logic.booked(req.params.roomId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

//details and checkout
server.post("/bookings", (req, res) => {
  console.log("inside booking api call");
  console.log(req.body);

  //logic
  logic
    .bookings(
      req.body.fullname,
      req.body.checkin,
      req.body.checkout,
      req.body.adult,
      req.body.children,
      req.body.email,
      req.body.phno,
      req.body.roomId
    )
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

//checkout
server.get("/checkout/:checkin/:roomId", (req, res) => {
  console.log("inside checkout api call");
  console.log(req.params.checkin, req.params.roomId);

  //logic
  logic.checkOut(req.params.checkin, req.params.roomId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

//confirm

server.post("/confirm", (req, res) => {
  console.log("inside confirm api call");
  console.log(
    req.body.fullname,
    req.body.checkin,
    req.body.checkout,
    req.body.adult,
    req.body.children,
    req.body.email,
    req.body.phno,
    req.body.roomId
  );

  //logic

  logic
    .confirmed(
      req.body.fullname,
      req.body.checkin,
      req.body.checkout,
      req.body.adult,
      req.body.children,
      req.body.email,
      req.body.phno,
      req.body.roomId
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//history

server.get("/history/:phno", (req, res) => {
  console.log("inside history api call");
  console.log(req.params.phno);

  //logic

  logic.history(req.params.phno).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

cron.schedule("0 * * * *", async () => {
  console.log("Cron job started at", new Date());
  const currentDate = new Date();
  const roomsToReturn = await db.RoomBooked.find({
    checkout: { $lte: currentDate },
  });
  console.log("Found rooms to return:", roomsToReturn);
  for (const room of roomsToReturn) {
    const newRoom = new db.Room({
      suite_name: room.suite_name,
      description: room.description,
      single_image: room.single_image,
      services: room.services,
      rate: {
        nightly: room.rate.nightly,
        weekly: room.rate.weekly,
      },
      roomId: room.roomId,
    });
    await newRoom.save();
    await db.RoomBooked.deleteOne({ roomId: room.roomId });
  }
  console.log(`Returned ${roomsToReturn.length} rooms to Room database.`);
});
