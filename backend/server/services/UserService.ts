import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const IsUserAvailableCheck = async (
  username: string
) => {
  const isUserAvailable = await prisma.userDetails.findFirst({
    where: { username: username },
  });

  return isUserAvailable;
};

export const CreateUser = async (data: {
  username: string;
  password: string;
  companyName: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: number;
  isAdmin: boolean;
}) => {

  const newUser = await prisma.userDetails.create({
    data: {
      username: data.username,
      password: data.password,
      companyName: data.companyName,
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      phoneNumber: data.phoneNumber,
      isAdmin: data.isAdmin,
    },
  });
  return newUser;
};

export const LogUserLogin = async (username: string, token: string) => {
  const loginLog = await prisma.loginLogs.create({
    data: {
      username,
      token
    },
  });

  return loginLog;
}