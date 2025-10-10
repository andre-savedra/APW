import { URGENCY_LEVELS } from "./enums.model";
import type { Equipment } from "./equipment.model";
import { User } from "./user.model";

export class Task {
    id: number = 0;
    name: string = "";
    description: string = "";
    creation_date: Date = new Date();
    suggested_date: Date = new Date();
    urgency_level: URGENCY_LEVELS = URGENCY_LEVELS.LOW;
    creator_FK: User = new User();
    equipments_FK: Array<Equipment> = [];
    assignees_FK: Array<User> = [];
}