const { AptDong, AptHo, sequelize } = require('../../models');

exports.getUserInfo = async (req, res) => {
    try {
        const complex = await AptDong.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('apt_complex')), 'complex'],
            ],
        });
        const dong = await AptDong.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('apt_dong')), 'dong'],
            ]
        });
        const ho = await AptHo.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('apt_ho')), 'ho'],
            ]
        });
        // const apt_complex = complex.map((aptComplex) => {
        //     aptComplex._attributes;
        // })
        const aptComplex = JSON.stringify(complex);
        const aptDong = JSON.stringify(dong);
        const aptHo = JSON.stringify(ho);
        
        res.render('./userinfo.html', {aptComplex, aptDong, aptHo});
    } catch (error) {
        console.error(error);
    }
}

exports.patchUserInfo = (req, res) => {
    // 입력받은 단지, 동, 호 데이터베이스에 추가
    res.send('OK');
}