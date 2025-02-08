const db = require("../models");
const Coach = db.coach;

exports.create = (req, res) => {
  Coach.create(req.body)
    .then(() => res.send({ message: "data berhasil disimpan" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Coach.find()
    .then((mahasiswas) => res.send(mahasiswas))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  Coach.findById(req.params.id)
    .then((mahasiswa) => res.send(mahasiswa))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  Coach.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Data tidak ditemukan atau gagal diupdate" });
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

  Coach.findByIdAndDelete(id)
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
