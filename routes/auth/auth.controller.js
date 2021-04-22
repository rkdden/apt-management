exports.getUserInfo = async (req, res) => {
    res.render('./userinfo.html');
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