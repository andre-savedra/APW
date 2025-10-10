import { Task } from "./task.model";
import { User } from "./user.model";

export class Notification {
    id: number = 0;
    text: string = "";
    task_FK: Task = new Task();
    user_FK: User = new User();
    creation_date: Date = new Date();
    read: boolean = false;
}
