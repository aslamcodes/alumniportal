import { sign } from "jsonwebtoken";

const generateToken = (id) => {
  const token = sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return token;
};

export default generateToken;
