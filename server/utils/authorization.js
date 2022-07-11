import jst from "jsonwebtoken";

const generateToken = (id) => {
  const token = jst.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return token;
};

export default generateToken;
