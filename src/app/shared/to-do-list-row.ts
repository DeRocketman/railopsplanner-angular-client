import {ToDoListRowItem} from "./to-do-list-row-item";

export interface ToDoListRow {
  name: string;
  start: string;
  end: string;
  stations: string;
  receivingDate: string;
  assignedPlannerName: string;
  agentName: string;
  processingStatus: number;
  toDoListTowItems?: ToDoListRowItem[];
}
