const { model } = require("mongoose");
const User = require("../db/user");
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens


async function registerUser(model) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({
        name: model.name,
        email: model.email,
        password: hashPassword,
        // isAdmin: false,
    });

    await user.save();
}

async function loginUser(model) {
    const user = await User.findOne({ email: model.email });
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(model.password, user.password);
    if (isMatch) {
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            "secret",
            { expiresIn: "1h" }
        );

        return { token, user };
    } else {
        return null;
    }
}

module.exports = {
    registerUser,
    loginUser,
};
