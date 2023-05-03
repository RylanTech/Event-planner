import { RequestHandler } from "express";
import { Events } from "../models/Events";
import { verifyUser } from "../services/auth";

// export const defaultRoute: RequestHandler = (req, res, next) => {
//     res.redirect("/");
// }

export const getAllEvents: RequestHandler = async (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    ${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}
    
    __________REQUEST BODY__________`);

    console.dir(req.body)

    let EventsInDB: Events[] = await Events.findAll();

    res.json(EventsInDB)
}

export const getEvent: RequestHandler = async (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    ${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}
    
    __________REQUEST BODY__________`);

    console.dir(req.body)

    let eventId = req.params.eventId
    let foundEvent = await Events.findByPk(eventId)
    if (foundEvent) {
        res.status(200).json(foundEvent);
    } else {
        res.status(404).json();
    }
}

export const getTenEvents: RequestHandler = async (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    ${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}
    
    __________REQUEST BODY__________`);

    console.dir(req.body)

    const { Op } = require('sequelize');
    let query = req.params.query.toString()
    let foundEvents = await Events.findAll({
        limit: 10,
        offset: 0,
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { description: { [Op.like]: `%${query}%` } },
            { org: { [Op.like]: `%${query}%` } }
          ]
        }
    })
    if (foundEvents) {
        res.status(200).json(foundEvents);
    } else {
        res.status(404).json();
    }
}

export const createEvent: RequestHandler = async (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    ${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}
    
    __________REQUEST BODY__________`);

    console.dir(req.body)

    let verified = await verifyUser(req);

    if (verified) {
        let newEvent: Events = req.body;
        if (newEvent.title && newEvent.time && newEvent.day && newEvent.description && newEvent.address) {
            newEvent.org = verified.org
            // console.log(newEvent)
            let created = await Events.create(newEvent);
            res.status(201).json(created);
        } else {
            res.status(400).json();
        }
    } else {
        res.status(403).json()
    }
    

}

// export const updateEvent: RequestHandler = async (req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    
//     let eventId = req.params.eventId;
//     let editedEvent: Events = req.body;

//     //This grabs the id from the params and makes it so it can be read in the if statement incase the request does not include the id.
//     let eventIdNum = parseInt(eventId);

//     let matchingEvent = await Events.findByPk(eventId)

//     if (matchingEvent && matchingEvent.eventId == 
//         eventIdNum && editedEvent.title && editedEvent.time && editedEvent.day && editedEvent.description && editedEvent.org && editedEvent.address) {
//         await Events.update(editedEvent, { where: {eventId: eventId} })
//         res.status(200).json();
//     } else {
//         res.status(400).json()
//     }
// }

export const deleteEvent: RequestHandler = async (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    [${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}
    
    __________REQUEST BODY__________`);

    console.dir(req.body)
    
    let verified = await verifyUser(req);

    if (verified) {
        let eventId = req.params.eventId;
        let foundEvent = await Events.findByPk(eventId);
    
        if (foundEvent) {
            await Events.destroy({
                where: { eventId: eventId }
            });
            res.status(200).json();
        } else {
            res.status(404).json();
        }
    } else {
        res.status(403).json()
    }
}