import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utilis/generateToken.js';


// Login user

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: null,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


//register user

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    const user = await User. 
    findOne({ email });

    if (user) {
        res.status(400);
        throw new Error('User already exists');
    }

    if (password !== confirmPassword) {
        res.status(400);
        throw new Error('Passwords do not match');
    }

    const newUser = await User.create({
        email,
        password,
    });

    if (newUser) {
        generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: null,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}
);

// logout user

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true,
    });

    res.status(200).json({ message: 'Logged out' });
});


// get user profile

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}
);

// update user profile

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}
);

export { loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile };

    



