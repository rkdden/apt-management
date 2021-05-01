const { AptHo, AptDong } = require('../../models');

exports.aptFind = async () =>{
    const apt = await AptHo.findAll({
            include: {
                model: AptDong
            },
    })
    return apt;
} 
