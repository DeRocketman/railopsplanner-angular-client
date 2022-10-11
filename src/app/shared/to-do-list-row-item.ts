export interface ToDoListRowItem {
  id?: string
  group: string;
  name: string;
  deadline: string;
  closingDate?: string;
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
