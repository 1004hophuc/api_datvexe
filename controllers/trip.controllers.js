const { Trip, Station } = require("../models");

// import {Op} từ thư viên sequelize để dùng cho việc tìm đối tượng theo filter\
const { Op } = require('sequelize')

const createTrip = async (req, res) => {
    const { fromStation, toStation, startTime, price } = req.body;

    const newTrip = await Trip.create({ fromStation, toStation, startTime, price });
    res.status(201).send(newTrip)
}

const getListTrip = async (req, res) => {
    // Lấy tên đằng sau dấu ? trên thanh url
    const { name } = req.query;
    try {
        if (name) {
            const listTrips = await Trip.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    },
                },
                include: [
                    {
                        model: Station,
                        as: "from"
                    },
                    {
                        model: Station,
                        as: "to"
                    },
                ]
            });
            res.status(200).send(listTrips);
        } else {
            const listTrips = await Trip.findAll({
                include: [
                    {
                        model: Station,
                        as: "from"
                    },
                    {
                        model: Station,
                        as: "to"
                    },
                ]
            });
            res.status(200).send(listTrips);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const getTripDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const tripDetail = await Trip.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Station,
                    as: "from"
                },
                {
                    model: Station,
                    as: "to"
                }
            ]
        })

        res.status(200).send(tripDetail);

    } catch (error) {
        res.status(500).send('Not found!')
    }
}

const deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const tripDelete = await Trip.destroy({
            where: {
                id
            }
        })
        res.status(200).send(`Xoá thành công trip có id là ${id}`);
    } catch (error) {
        res.status(500).send("Not found!")
    }
}

const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { fromStation, toStation, startTime, price } = req.body;

    try {
        const tripUpdate = await Trip.findOne({
            where: { id }
        })
        tripUpdate.fromStation = fromStation;
        tripUpdate.toStation = toStation;
        tripUpdate.startTime = startTime;
        tripUpdate.price = price;

        await tripUpdate.save();

        res.status(200).send(`Update thành công trip có id là ${id}`);
    } catch (error) {
        res.status(500).send("Not found!")
    }
}

module.exports = {
    createTrip,
    getListTrip,
    getTripDetail,
    deleteTrip,
    updateTrip
}
