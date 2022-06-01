const { Station } = require("../../models");

const CheckExist = (Model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        // Kiểm tra xem station đó có tồn tại hay không
        const station = await Model.findOne({
            where: {
                id
            }
        });
        if (station) {
            next()
        } else {
            res.status(404).send(`Không tìm thấy station có id là ${id}`);
        }
    }
}
module.exports = {
    CheckExist
}