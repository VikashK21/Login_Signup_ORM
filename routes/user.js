var express = require('express');
var router = express.Router();
const UserService = require('../services/user');
const Services = new UserService();
console.log(Services, "service log kar rha hu", UserService, "UserService");
const { authenticationToken, authorizationToken, logoutToken } = require('../auth/security')

// create users account
router.post('/signup', logoutToken, async (req, res) => {
    try {
        const acc = await Services.accChecking(req.body);
        if (acc) {
            res.send('This account already exist!!')
        } else {
            Services.createUsers(req.body).then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err);
            })
        }
    } catch (err) {
        res.send(err);
    }
});

// login user with JWT
router.post('/login', async (req, res) => {
    try {
        const userInfo = await Services.accChecking(req.body);
        if (userInfo) {
            const token = authenticationToken(userInfo);
            res.cookie("key", token).send("You are successfully logged in.");
        } else {
            res.send("Either email or password is wrong!!");
        }
    } catch (err) {
        res.send(err);
    }
})

// get all users
router.get('/getData', authorizationToken, async (req, res) => {
    try {
        const allUsers = await Services.findAll();
        res.send(allUsers)
    } catch (err) {
        res.send(err);
    }
})

// get user by id
router.get('/getBy/:id', authorizationToken, async (req, res) => {
    try {
        const userId = req.params.id;
        await Services.findById(userId).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        res.send(err);        
    }
})

router.post('/logout', authorizationToken, async(req, res) => {
    try {
        res.clearCookie('key').send('You are logged out now.');
    } catch (err) {
        res.send(err);
    }

})
module.exports = router;