const { AptDong, AptHo, User, sequelize } = require('../../models');

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

exports.patchUserInfo = async (req, res) => {
    // 입력받은 단지, 동, 호 데이터베이스에 추가
    const {
        complex,
        dong,
        ho,
    } = req.body;
    try {
        const sample = await AptHo.findOne({
            where: {
                apt_ho : ho,
            },
            include: {
                    model: AptDong,
                    where: {
                        apt_complex: complex,
                        apt_dong: dong,
                    },
            },
        });
        if(sample) { // 찾은 값이 있다면
            const updateUser = await User.update({apt_ho: sample.id}, {where: {id: req.user.id}});
            return res.json({success: true});
        } else {
            return res.json({success: false});
        }
    } catch (error) {
        console.error(error);
    }
}