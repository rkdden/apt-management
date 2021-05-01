const { AptHo, AptDong } = require('../../models');

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