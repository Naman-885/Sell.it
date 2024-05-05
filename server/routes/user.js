const express = require('express');
const server = express.Router();
const db = require('../database/dbConn');
const sha = require('sha256');
const date = require('date-and-time');
const Jwt = require('jsonwebtoken');
require('dotenv').config({ path: './secure.env' });

//Register route
server.post('/api/userRegx', async (req, res) => {
    //get form data
    let userName = req.body.UserName;
    let email = req.body.Email;
    let password = req.body.Password;
    let cPassword = req.body.CfmPassword;

    //Check if fields are empty
    if (userName == "" || email == "" || password == "" || cPassword == "") {
        return res.json({
            status: 501, error: "Please enter all the fields"
        });
    }

    if (password.length < 8 || password.length > 10) {
        return res.json({
            status: 501, error: "Password must contain of 8 to 10 characters"
        })
    }
    else if (password != cPassword) {
        return res.json({
            status: 501, error: "Please enter same password"
        });
    }

    userName = JSON.stringify(userName);
    email = JSON.stringify(email);
    password = JSON.stringify(sha.x2(password));
    cPassword = JSON.stringify(sha.x2(cPassword));

    console.log(password);

    //Check if Email exists in db
    let emailQuery = `SELECT count(emailId) FROM userregister WHERE emailId = ${email}`;

    //Execute query
    db.query(emailQuery, (error, rows) => {
        if (error != null || error != undefined) {
            return res.json({
                status: 501, error: `${error}`
            })
        }
        if (rows[0]["count(emailId)"] > 0) {
            return res.json({
                status: 101, error: `Email already exists.`
            })
        } else {
            //query to insert user details
            let query = `INSERT INTO userregister (userName, emailId, password, cfmPassword) VALUES (${userName}, ${email}, ${password}, ${cPassword})`;

            //query to insert
            db.query(query, (error) => {
                if (error != null || error != undefined) {
                    return res.json({
                        status: 501, error: `${error}`,
                    })
                } else {
                    return res.json({
                        status: 200
                    })
                }
            })
        }
    })
});


//Login route
server.post('/api/userSignIn', async (req, res) => {
    let email = req.body.Email;
    let password = req.body.Password;

    //Check if fields are empty
    if (email == "" || password == "") {
        return res.json({
            status: 501, error: "Please enter all the fields"
        });
    }

    email = JSON.stringify(email);
    password = JSON.stringify(sha.x2(password));

    //Check if Email exists in db
    let query = `SELECT count(*) FROM userregister WHERE emailId = ${email} AND password = ${password}`;

    db.query(query, (error, rows) => {
        if (error != null || error != undefined) {
            return res.json({
                status: 501, error: `${error}`,
            })
        }

        if (rows[0]["count(*)"] > 0) {
            let userId = 0;
            let userIdQuery = `SELECT * FROM userregister WHERE emailId = ${email}`;
            db.query(userIdQuery, (error1, result) => {
                if (error1 != null || error1 != undefined) {
                    return res.json({
                        status: 501, error: `${error1}`,
                    })
                }
                userId = result[0]["uId"];

                const now = new Date();
                let dt = date.format(now, 'YYYY/MM/DD HH:mm:ss');

                let loginDetailQuery = `INSERT INTO userlogindetails (vchDateTime, intUserId)
                    VALUES (${JSON.stringify(dt)}, ${userId})`;

                if (userId > 0) {
                    db.query(loginDetailQuery, (error2, result1) => {
                        if (error2 != null || error2 != undefined) {
                            return res.json({
                                status: 501, error: `${error2}`
                            })
                        } else {

                            const token = Jwt.sign({
                                USERNAME: result[0]["userName"],
                                EMAIL: result[0]["emailId"],
                                NUMBER : Math.random(0, 100000),
                            }, process.env.SECRETKEY, {
                                expiresIn: 25892000000
                            });

                            return res.json({
                                status: 200, data : token
                            })
                        }
                    })
                }
            });
        } else {
            return res.json({
                status: 501, error: "Invalid login"
            })
        }
    })
});


module.exports = server;