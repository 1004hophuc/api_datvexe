// import object model vào
const { Station } = require("../models");

// import {Op} từ thư viên sequelize để dùng cho việc tìm đối tượng theo filter\
const { Op } = require('sequelize')

const createStation = async (req, res) => {
    const { name, address, province } = req.body;
    // Logic mất thời gian
    const newStation = await Station.create({ name, address, province });
    res.status(201).send(newStation);
}

const getListStation = async (req, res) => {
    // Lấy tên đằng sau dấu ? trên thanh url
    const { name } = req.query;
    try {
        if (name) {
            const listStation = await Station.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    },
                }
            });
            res.status(200).send(listStation);
        } else {
            const listStation = await Station.findAll();
            res.status(200).send(listStation);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const getStationDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const stationDetail = await Station.findOne({
            where: {
                id
            }
        });
        res.status(200).send(stationDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateStation = async (req, res) => {
    const { id } = req.params;
    const station = req.body;
    try {
        const stationUpdate = await Station.findOne({
            where: {
                id
            }
        })
        stationUpdate.name = station.name;
        stationUpdate.address = station.address;
        stationUpdate.province = station.province;

        await stationUpdate.save();
        res.status(200).send(stationUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteStation = async (req, res) => {
    const { id } = req.params;
    try {
        const stationDelete = await Station.destroy({
            where: {
                id
            }
        })
        res.status(200).send("Xoá thành công!");
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createStation,
    getListStation,
    getStationDetail,
    updateStation,
    deleteStation
}