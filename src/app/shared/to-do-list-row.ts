import {ToDoListRowItem} from "./to-do-list-row-item";

export interface ToDoListRow {
  name: string;
  start: Date;
  end: Date;
  stations: string;
  receivingDate: Date;
  assignedPlannerName: string;
  agentName: string;
  processingStatus: number;
  toDoListTowItems?: ToDoListRowItem[];
}
