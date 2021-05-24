const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

const cors = require("cors");

router.use(cors());

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);

module.exports = router;
