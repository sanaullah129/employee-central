import { Request, Response } from "express";
import { CreateUser, IsUserAvailableCheck } from "../services/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      companyName,
      firstName,
      lastName,
      emailId,
      phoneNumber,
      isAdmin,
    } = req.body;

    if (
      !username ||
      !password ||
      !companyName ||
      !firstName ||
      !lastName ||
      !emailId ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ statusId: 2, status: "Please fill all the details" });
    }

    const IsUserAvailable = await IsUserAvailableCheck(username);
    if (IsUserAvailable) {
      return res
        .status(400)
        .json({ statusId: 3, status: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await CreateUser({
      username,
      password: hashedPassword,
      companyName,
      firstName,
      lastName,
      emailId,
      phoneNumber,
      isAdmin,
    });
    if (createUser) {
      return res
        .status(200)
        .json({ statusId: 1, status: "User Created Successfully" });
    } else {
      return res.status(500).json({
        statusId: 0,
        status: "Some error occured while creating user",
      });
    }
  } catch (error: any) {
    console.log("Error in register admin: " + error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please Enter all the Details" });
    }

    const existingUser = await IsUserAvailableCheck(username);

    if(!existingUser){
        return res.status(404).json({statusId: 1, status: "No User with this username found"});
    }
    let isPasswordCorrect: boolean = false;

    if (existingUser) {
      isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
    }

    if(existingUser && isPasswordCorrect){
        const jwtSecret = process.env.JWT_TOKEN as string;

        if (jwtSecret) {
            //jwt token
            const token: string = jwt.sign(
              {
                username: existingUser.username,
                password: existingUser.password,
                id: existingUser.id,
              },
              jwtSecret,
              { expiresIn: "1d" }
            );    
            res.json({ Bearer: token });
          }

    }
    else{
        res.status(401).json({statusId: 2, status: "Invalid Username and Password Combination"});
    }

};