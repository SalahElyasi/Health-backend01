import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";
import Posts from "../models/Posts.js";

// export const signUp = asyncHandler(async (req, res, next) => {
//   const { name, email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     return next(new ErrorResponse("Email already in use", 403));
//   }
//   // hash password
//   const hashedPassword = await bcrypt.hash(password, 7);
//   const newUser = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });
//   // create token
//   const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.status(201).json({
//     success: true,
//     data: newUser,
//     token,
//   });
// });
//------------------------------------------------------------------signUp
export const signUp = asyncHandler(async (req, res) => {
  const { name, last_name, email, password, account_type } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) throw new ErrorResponse("Email already taken", 403);
  const hashPassword = await bcrypt.hash(password, 5);
  const { _id, name: userName } = await User.create({
    name,
    last_name,
    email,
    password: hashPassword,
    account_type,
  });
  const token = jwt.sign({ _id, userName }, process.env.JWT_SECRET);
  res.json({ token });
});
//------------------------------------------------------------------signIn
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email }).select("+password");
  if (!foundUser) throw new Error("User does not exist");
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) throw new Error("Password is incorrect");
  const token = jwt.sign(
    { _id: foundUser._id, userName: foundUser.name },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

//------------------------------------------------------------------getUserInfo
export const getUserInfo = asyncHandler(async (req, res) => {
  res.send(req.user);
});
//------------------------------------------------------------------approvedSession
export const approvedSession = asyncHandler(async (req, res) => {
  res.json({ success: "Valid token" });
});
//----------------------------------------------update Backend
export const update = (req, res) => {
  const {
    name,
    email,
    phone,
    age,
    city,
    languages,
    price,
    experience,
    bio,
    motto,
    gender,
    image,
  } = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name,
        email,
        phone,
        age,
        city,
        languages,
        price,
        experience,
        bio,
        motto,
        gender,
        image,
      },
    },
    { overwrite: false, new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!" + err);
      } else {
        // const token = jwt.sign(
        //   { _id: User._id, userName: User.name },
        //   process.env.JWT_SECRET
        // );
        // res.json({ token });
        return res.json({
          success: true,
          data: doc,
        });
      }
    }
  );
};
//-----------------------------------------------------------------createPost
export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const result = await Posts.create({
    title,
    content,
    postedBy: req.user,
  });
  if (result) {
    res.send(result);
    //res.send("success");
  }

  // Posts.createCollection("posts", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   Posts.close();
  // });
  // Posts.insertOne({
  //   title,
  //   content,
  // });
  // res.send("success");
});

//-------------------------------------------------------------getPostById
export const getPostById = asyncHandler(async (req, res, next) => {
  let id = req.params.id.toString();
  Posts.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//-------------------------------------------------------------getPost
export const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Posts.find({});
    res.send(post);
  } catch (e) {
    console.log(e.message);
  }
});
//-------------------------------------------------------------myPosts
export const myPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Posts.find({ postedBy: req.user._id }).populate(
      "PostedBy",
      "_id name"
    );
    res.send(post);
  } catch (e) {
    console.log(e.message);
  }
});
//-------------------------------------------------------------getUser
export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    console.log(e.message);
  }
});
//-------------------------------------------------------------likePost
export const likePost = asyncHandler(async (req, res) => {
  Posts.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//-------------------------------------------------------------unlikePost
export const unlikePost = asyncHandler(async (req, res) => {
  Posts.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});
//-------------------------------------------------------------commentPost
export const commentPost = (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Posts.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { comments: comment },
    },
    { overwrite: false, new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!" + err);
      } else {
        return res.json({
          success: true,
          data: doc,
        });
      }
    }
  );
};
//-------------------------------------------------------------deleteCommentPost
export const deleteCommentPost = (req, res) => {
  const comment = {
    commentId: req.body.commentId,
    id: req.user._id,
  };

  Posts.findByIdAndUpdate(
    req.body.id,
    {
      $pull: { comments: { _id: comment.commentId } },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

//-------------------------------------------------------------deletePost
export const deletePost = (req, res) => {
  Posts.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
};
