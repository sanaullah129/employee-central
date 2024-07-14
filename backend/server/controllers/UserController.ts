import { Request, Response } from "express";
import { CreateUser, IsUserAvailableCheck } from "../services/UserService";

export const registerAdmin = async (req: Request, res: Response) => {
    const { username, password, companyName, firstName, lastName, emailId, phoneNumber } = req.body;

    if (!username || !password || !companyName || !firstName || !lastName || !emailId || !phoneNumber) {
        return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    const IsUserAvailable: boolean = await IsUserAvailableCheck(username, emailId);

    if (IsUserAvailable) {
        return res.status(400).json({ statusId: 0, status: "User already exists" });
    };

    const createUser = await CreateUser({ username, password, companyName, firstName, lastName, emailId, phoneNumber });
};
