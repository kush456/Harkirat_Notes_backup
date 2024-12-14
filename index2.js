const jwt = require("jsonwebtoken");
const jwtSecret = "12345";
const zod = require("zod");


const usernameSchema = zod.string().email();
const passwordSchema = zod.string().min(8).max(32);
function signJWT(username, password){
    const emailResponse = usernameSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!emailResponse.success ||!passwordResponse.success){
        return null;
    }
    const token = jwt.sign(username, jwtSecret); //yaha password of the user is basically pointless but ok koi na 
    return token;

}

function decodeJWT(token){
    const decoded = jwt.decode(token);
    //only requires the token and not the secret
    //returns js object
    return decoded;
}

function verifyJWT(token){
    let ans;
    //verify throws an error, we dont want the code to crash and then we wont know kaha kharab hua 
    //so use try catch, it catches the error and baaki ka code proceeds
    try{
        jwt.verify(token, jwtSecret);
        ans = true;
    } catch(e){
        ans = false;
    }

    return ans;
}
