import { IUser } from "./user.interface";

export interface ITodo {
    id: string;
    title: string;
    description: string;
    complete: boolean;
    user: IUser;
  }
  