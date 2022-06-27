import { reactive } from "#app";
import { defineStore } from "pinia";
import { encode, decode } from "@msgpack/msgpack";
import { Instrument, InstrumentCache, ISharedObject } from "@/types";

export const useWebSocket = defineStore("webSocket", () => {
  let connection: WebSocket | null = null;
  const watch_list: { id: string; name: string }[] = [];
  const handlers: { [key: string]: (obj: ISharedObject) => any } = {};

  const toSend: Array<any> = [];
  function connect() {
    connection = new WebSocket(
      process.env.VUE_WSS_Host ?? "wss://localhost:7122/instrument/ws"
    );
    connection.binaryType = "arraybuffer";
    connection.onmessage = (msg) => {
      if (typeof msg.data == "object") {
        const resp: ISharedObject = decode(msg.data) as ISharedObject;
        if (handlers[resp.typ]) {
          handlers[resp.typ](resp);
        } else {
          console.log("Message-Type '" + resp.typ + "' is unhandled!");
        }
      }
    };
    connection.onopen = () => {
      for (let i in toSend) {
        send(toSend[i]);
      }
    };
  }

  function registerHandler(type: string, handler: (obj: ISharedObject) => any) {
    handlers[type] = handler;
  }

  function addInstrumentToWatch(instrument: InstrumentCache | Instrument) {
    watch_list.push({ id: instrument.instrumentId, name: instrument.name });
  }

  function watchInstruments(list: { id: string; name: string }[] | null) {
    send({
      typ: "TSE_WATCHER",
      time: 0,
      packet_time: new Date().toISOString(),
      obj: list ?? watch_list,
    });
  }

  function send(msg: ISharedObject) {
    if (connection && connection.readyState) connection?.send(encode(msg));
    else toSend.push(msg);
  }

  return {
    connect,
    send,
    watchInstruments,
    addInstrumentToWatch,
    registerHandler,
  };
});