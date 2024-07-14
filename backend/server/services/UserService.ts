import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const IsUserAvailableCheck = async (username: string, emailId: string): Promise<boolean> => {
  const isUserAvailable = await prisma.admin.findFirst({
    where: {
      AND: [
        { username: username },
        { emailId: emailId },
      ],
    },
  });

  return isUserAvailable !== null;
};

export const CreateUser = async (data: {username: string; password: string; companyName: string; firstName: string; lastName: string; emailId: string; phoneNumber: number;}) => {
    const newUser = await prisma.admin.create({
        data: {
          username: data.username,
          password: data.password,
          companyName: data.companyName,
          firstName: data.firstName,
          lastName: data.lastName,
          emailId: data.emailId,
          phoneNumber: data.phoneNumber,
        },
      });
} 