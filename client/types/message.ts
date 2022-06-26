import { SearchModel } from "./collection";

export class MessageQuery implements SearchModel {
  filters: MessageFilter;
  offset: number;
  length: number;
  echo: any;
  constructor(offset: number, length: number, filters: MessageFilter) {
    this.filters = filters;
    this.offset = offset;
    this.length = length;
  }
}

export class MessageFilter {
  //TODO Change name to from
  dateTime: string | null;
  tags: MessageTag[];
  constructor(tags: MessageTag[], dateTime: string | null = null) {
    this.tags = tags;
    this.dateTime = dateTime;
  }
}

export class MessageTag {
  recordId: number;
  entity: number;
  constructor(record: number, entity: number) {
    this.recordId = record;
    this.entity = entity;
  }
}

export interface Message {
  id: number;
  dateTime: string | null;
  title: string;
  preview: string;
  origin: number;
  type: number;
  flags: number;
  message: string;
  seenDate: string;
}

export interface MessageTemplate {
}

export interface MessageTemplate_1 extends MessageTemplate {
  body: String;
}
