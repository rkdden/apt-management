const { AptHo, AptDong } = require('../models');
const { findAll } = require('../models/aptDong');

module.exports = {
    async aptFind() {
       
        const apt = await AptHo.findAll({
                include: {
                    model: AptDong
                },
        })
        return apt;
        
    }   
};