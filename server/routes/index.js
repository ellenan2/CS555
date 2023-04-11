const usersRoutes = require("./users");
const serviceRoutes = require("./services");
const offerRoutes = require("./offers");

const constructorMethod = (app) => {
  app.use("/", usersRoutes);
  app.use("/services", serviceRoutes);
  app.use("/offers", offerRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
