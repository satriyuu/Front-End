const express = require('express');
const cors = require('cors');
const app = express();
const conn = require('./config/db');

app.use(cors());
app.use(express.json());

app.get('/get-pengunjung', function (req, res) {
    const queryStr = "SELECT id, Nama, Job, Umur FROM pengunjung WHERE deleted_at IS NULL";
    conn.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses menampilkan data",
                "data": results
            });
        }
    });
});

app.post('/store-pengunjung', function (req, res) {
    console.log(req.body);
    const param = req.body;
    const name = param.name;
    const job = param.job;
    const umur = param.umur;
    const now = new Date();

    const queryStr = "INSERT INTO pengunjung (Nama, Job, Umur, created_at) VALUES (?, ?, ?, ?)";
    const values = [name, job, umur, now];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            return res.status(200).json({
                "success": true,
                "message": "Sukses menyimpan data",
                "data": results
            });
        }
    });
});

app.get('/get-pengunjung-by-id', function (req, res) {
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM pengunjung WHERE deleted_at IS NULL AND id = ?";
    const values = [id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses menampilkan data",
                "data": results
            });
        }
    });
});

app.post('/update-pengunjung', function (req, res) {
    const param = req.body;
    const id = param.id;
    const name = param.name;
    const job = param.job;
    const umur = param.umur; // tambahkan umur

    const queryStr = "UPDATE pengunjung SET Nama = ?, Job = ?, Umur = ? WHERE id = ? AND deleted_at IS NULL";
    const values = [name, job, umur, id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            return res.status(200).json({
                "success": true,
                "message": "Sukses memperbarui data",
                "data": results
            });
        }
    });
});

app.post('/delete-pengunjung', function (req, res) {
    const param = req.body;
    const id = param.id;
    const now = new Date();

    const queryStr = "UPDATE pengunjung SET deleted_at = ? WHERE id = ?";
    const values = [now, id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            return res.status(200).json({
                "success": true,
                "message": "Sukses menghapus data",
                "data": results
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
