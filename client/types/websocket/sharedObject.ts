export interface ISharedObject {
  typ: string;
  packetTime: string | null;
  time: Array<number> | null;
  obj: Uint8Array | null;
  referenceNumber: string;
  detail: Uint8Array | null;
  agent: string;
}
