const db = require("../models");
const HomeTeam = db.homeTeam;

exports.create = (req, res) => {
  HomeTeam.create(req.body)
    .then(() => res.send({ message: "data berhasil disimpan" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  HomeTeam.find()
    .then((mahasiswas) => res.send(mahasiswas))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  HomeTeam.findById(req.params.id)
    .then((mahasiswa) => res.send(mahasiswa))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  HomeTeam.findByIdAndUpdate(id, req.body, { new: true }) // `new: true` returns updated document
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Data tidak ditemukan atau gagal diupdate" });
      }
      res.send({ message: "Data berhasil diperbarui", data });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  HomeTeam.findByIdAndDelete(id)
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
