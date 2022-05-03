export interface ToDoListRowItem {
  group: string;
  name: string;
  deadline: Date;
  closingDate?: Date;
  testMark?: string;
  metaData: ToDoListItemMetaData[];
}

export interface ToDoListItemMetaData {
  milestoneItem: boolean;
  testMarkNeeded: boolean;
  relativeToStart: boolean;
  global: boolean;
}
