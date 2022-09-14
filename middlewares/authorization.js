import { User } from "../models";

const authorization = async (req, res, next) => {
  // const { id } = req.params;
  const { id, role } = req.user;
  try {
    const findUser =  await User.findOne({
      where : {
        id : Number(id)
      }
    });
    if (!findUser) {
      throw {
        name: "USER_NOT_FOUND"
      }
    }
    if (findUser && findUser.role !== 'admin') {
      throw {
        name: "Forbidden",
      };
    }
    next();
  }
  catch (err) {
    console.log(err)
    next(err);
  }
}

module.exports = authorization;