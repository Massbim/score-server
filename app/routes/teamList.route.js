module.exports = (app) => {
  const awayTeam = require("../controllers/teamList.controller");
  const r = require("express").Router();

  r.get("/", awayTeam.findAll);
  r.get("/:id", awayTeam.show);
  r.post("/", awayTeam.create);
  r.put("/:id", awayTeam.update);
  r.delete("/:id", awayTeam.delete);
  r.post("/swap", awayTeam.swapTeams);

  app.use("/teamList", r);
};
