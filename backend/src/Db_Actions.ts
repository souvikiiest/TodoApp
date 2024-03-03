import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(
  userName: string,
  firstName: string,
  lastName: string,
  password: string
) {
  const response = await prisma.user.create({
    data: {
      userName,
      password,
      firstName,
      lastName,
    },
  });
  return response;
}
//CHECK IF USER EXISTS
export async function CheckUser(userName: string) {
  const response = await prisma.user.findFirst({
    where: {
      userName,
    },
  });
  return response;
}
//END OF CHECK USER
export async function findUser(userName: string, password: string) {
  const response = await prisma.user.findFirst({
    where: {
      userName,
      password,
    },
    select: {
      firstName: true,
      lastName: true,
      id: true,
    },
  });
  return response;
}
export async function GetTodo(userId: number) {
  const response = await prisma.todos.findMany({
    where: {
      userId,
    },
    select: {
      title: true,
      description: true,
      done: true,
      Todoid: true,
    },
  });
  return response;
}
export async function addTodo(
  userId: number,
  title: string,
  description: string
) {
  const response = await prisma.todos.create({
    data: {
      userId,
      title,
      description,
    },
  });
  return response;
}
export async function UpdateTodo(
  Todoid: number,
  title: string,
  description: string,
  isdelete: boolean
) {
  if (isdelete) {
    const responseUp = await prisma.todos.delete({
      where: {
        Todoid,
      },
    });
    return responseUp;
  } else {
    const responseUp = await prisma.todos.update({
      data: {
        title,
        description,
      },
      where: {
        Todoid,
      },
    });
    return responseUp;
  }
}
export async function DoneTodo(Todoid: number) {
  const responseUp = await prisma.todos.update({
    data: {
      done: true,
    },
    where: {
      Todoid,
    },
  });
  return responseUp;
}
