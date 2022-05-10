export interface ToDoListRowItem {
  group: string;
  name: string;
  deadline: Date;
  closingDate?: Date;
  testMark?: string;
  metaData: ToDoListItemMetaData[];
}

export interface ToDoListItemMetaData {
  isMilestoneItem: boolean;
  isTestMarkNeeded: boolean;
  isRelativeToStart: boolean;
  isGlobal: boolean;
}
