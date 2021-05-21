const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            status: 'error',
            message: 'Some Parameter missing',
            data: {},
        });
        return;
    }
    const emp_email = req.body.email;
    const emp_password = req.body.password;

    User.findOne({
        where: { emp_email: emp_email, emp_password: emp_password },
    })
        .then((data) => {
            if (data !== null) {
                let user_data = {
                    emp_id: data.dataValues.emp_id,
                    emp_name: data.dataValues.emp_name,
                    emp_role: data.dataValues.emp_role,
                    emp_email: data.dataValues.emp_email,
                };

                jwt.sign(user_data, process.env.JWT_SECRET, (err, JWT_data) => {
                    if (err) {
                        console.log('JWT Error: ', err);
                        res.json({
                            status: 'error',
                            message: 'Error while signing JWT.',
                            data: {},
                        });
                        res.end();
                        return;
                    }
                    console.log('JWT data: ', JWT_data);
                    user_data.token = JWT_data;

                    res.json({
                        status: 'success',
                        message: 'User Found',
                        data: user_data,
                    });
                    res.end();
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'No user Found',
                    data: {},
                });
                res.end();
            }
        })
        .catch((err) => {
            console.log('error: ', err);

            res.json({
                status: 'error',
                message: 'error occurred while querying',
                data: {},
            });
            res.end();
        });
});

router.get('/', function (req, res) {
    res.send('Try POST method');
});
module.exports = router;
