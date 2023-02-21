export interface ISharedObject {
  typ: string;
  packet_time: string;
  time: Array<number>;
  obj: Uint8Array;
  referenceNumber: string;
  detail: Uint8Array;
  agent: string;
}
