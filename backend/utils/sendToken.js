//Create a token and save it in the cookie

const sendToken = (user, ststusCode, res) => {
    const token = user.getJWTToken();// this is defined in userModel as one of the methods

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000 //conversion into milliseconds
        ),
        httpOnly: true,//this option prevents client side scripting language to access data
    }

    res.status(ststusCode).cookie('token', token, options).json({
        success:true,
        user,
        token,
    })
}

module.exports = sendToken;