export interface ToDoListRowItem {
  id?: string
  group: string;
  name: string;
  deadline: Date;
  closingDate?: Date;
  testMark?: string;
  metaData: ToDoListItemMetaData[];
}

export interface ToDoListItemMetaData {
  id?: string
  isMilestoneItem: boolean;
  isTestMarkNeeded: boolean;
  isRelativeToStart: boolean;
  isGlobal: boolean;
}
