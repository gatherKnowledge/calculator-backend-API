var express = require("express");
var router = express.Router();

const data = [];

let genId = 1;
const idGenerator = () => {
  return genId++;
};

router.get("/", function (_, res) {
  res.json(data);
});

router.post("/", function (req, res) {
  if (!req.body.result) return res.status(400).send({ error: "bad request" });
  data.push({
    id: idGenerator(),
    result: req.body.result,
  });
  res.json("ok");
});

router.delete("/:id", function (req, res) {
  const paramId = req.params.id;
  if (!paramId) {
    return res.status(400).send({ error: "bad request" });
  }
  const idx = data.findIndex((x) => Number(x.id) === Number(paramId));
  if (idx > -1) {
    data.splice(idx, 1);
    return res.send("ok");
  } else {
    return res.send("no data");
  }
});

module.exports = router;
