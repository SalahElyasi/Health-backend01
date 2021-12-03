import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Unauthorized");
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    const foundUser = await User.findOne({ _id });
    if (!foundUser) throw new Error("User does not exist");
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//------------------------

// const verifyToken = (req, res, next) => {
//   const { authorization } = req.headers
//   if (authorization) {
//     jwt.verify(authorization, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).send('Forbiden, access denied')
//       }
//       console.log('verify token', user) //{ username: 'username', iat: 1603288443 }
//       const foundUser = User.findOne({ _id: user.id })
//       if (!foundUser) throw new Error('User does not exist')
//       req.user = foundUser
//       console.log('founruser', foundUser)
//       // console.log('req.user', req.user)
//       return next() //Should go to the next middleware
//     })
//   }
//   return res.status(403).send('Bad message') //But always hits this message or the 404 one
// }

//------------------------

// const verifyToken = (req, res, next) => {
//   if (!req.headers["authorization"]) return next(createError.Unauthorized());
//   const authHeader = req.headers["authorization"];
//   const bearerToken = authHeader.split(" ");
//   const token = bearerToken[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) {
//       const message =
//         err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
//       return next(createError.Unauthorized(message));
//     }
//     req.payload = payload;
//     next();
//   });
// };

export default verifyToken;
