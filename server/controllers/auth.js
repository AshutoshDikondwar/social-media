import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// regester user
const regester = async (req, res) => {
    try {
        const { firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 100),
            impressions: Math.floor(Math.random() * 100)
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}

//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: "user does not exist" })

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json({ msg: "Invalid credentials" })

        //jwt
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password //deleting password so that it wont get passed to frontend
        res.status(200).json({ token, user });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export { regester, login }
