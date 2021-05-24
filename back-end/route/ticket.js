const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { Op } = require('sequelize');

router.get('/:ticket_id?', function (req, res) {
    if (!req.params.ticket_id) {
        // send all tickets for dashboard  code here

        Ticket.findAll()
            .then((tickets) => {
                let ticketsList = [];
                for (const ticket of tickets) {
                    ticketsList.push(ticket.dataValues);
                }

                if (ticketsList.length === 0) {
                    res.json({
                        status: 'success',
                        message: 'No ticket found in database',
                        data: { ticketsList },
                    });
                    return;
                }

                res.json({
                    status: 'success',
                    message: 'Tickets successfully retrieved from database',
                    data: { ticketsList },
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.json({
                    status: 'error',
                    message: 'Error while querying tickets',
                    data: {},
                });
                return;
            });

        // res.send('');
    } else {
        // supplied data for supplied ticket id  code here
        let ticket_id = req.params.ticket_id;

        Ticket.findByPk(ticket_id)
            .then((ticket) => {
                console.log(ticket);
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.json({
                    status: 'error',
                    message: 'Error while querying ticket',
                    data: {},
                });
                return;
            });

        // res.send('');
    }
});

router.post('/', function (req, res) {
    // add ticket to db code here

    // Ticket.create({
    //     emp_id: 1,
    //     client: 1
    //   }, { fields: ['emp_id','created_on','updated_on','status','priority','contact','subject','client' ] }).then((ticket) => {
    //     console.log(ticket);
    //     return;
    // })
    // .catch((err) => {
    //     console.log('Error: ', err);
    //     res.json({
    //         status: 'error',
    //         message: 'Error while querying ticket',
    //         data: {},
    //     });
    //     return;
    // });

    res.end('');
});

router.put('/', function (req, res) {
    // update already existing ticket code here
    res.end('');
});

router.delete('/', function (req, res) {
    // delete ticket code here
    res.end('');
});

// tickets summary for dashboard
router.get('/summary', (req, res) => {
    const totalTickets = Ticket.count({})
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    const openTicket = Ticket.count({
        where: {
            ticket_id: {
                [Op.eq]: 'open',
            },
        },
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    const resolvedTicket = Ticket.count({
        where: {
            ticket_id: {
                [Op.eq]: 'closed',
            },
        },
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    Promise.all([totalTickets, openTicket, resolvedTicket])
        .then((response) => {
            res.json({
                status: 'success',
                message: 'Promises resolved successfully',
                data: {
                    totalTickets: response[0],
                    openTicket: response[1],
                    resolvedTicket: response[2],
                },
            });
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 'error',
                message: 'error occurred with promise',
                data: {},
            });
            res.end();
        });
});

module.exports = router;
