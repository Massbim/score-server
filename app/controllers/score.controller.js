const db = require("../models");
const Score = db.score;

exports.create = (req, res) => {
  Score.create(req.body)
    .then(() => res.send({ message: "data berhasil disimpan" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Score.find()
    .then((mahasiswas) => res.send(mahasiswas))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  Score.findById(req.params.id)
    .then((mahasiswa) => res.send(mahasiswa))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const {
    messagesHome = [],
    messagesAway = [],
    minutesHome,
    minutesAway,
  } = req.body;

  const homeValue = Array.isArray(messagesHome) ? messagesHome.length : 0;
  const awayValue = Array.isArray(messagesAway) ? messagesAway.length : 0;

  Score.findByIdAndUpdate(
    id,
    {
      home: homeValue,
      away: awayValue,
      messagesHome,
      messagesAway,
      minutesAway,
      minutesHome,
    },
    { new: true } // Ensures updated document is returned
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Tidak dapat mengupdate data" });
      }
      res.send({ message: "Data berhasil diperbarui", data });
    })
    .catch((err) =>
      res
        .status(500)
        .send({
          message: "Terjadi kesalahan saat memperbarui data",
          error: err.message,
        })
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Score.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Tidak dapat menemukan data untuk dihapus" });
      }
      res.send({ message: "Data berhasil dihapus" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
