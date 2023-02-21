import { defineStore } from "pinia";
import { encode, decode } from "@msgpack/msgpack";
import { useUser } from ".";
import { Instrument, InstrumentCache, ISharedObject } from "@/types";

export const useWebSocket = defineStore("webSocket", () => {
  const handlers: { [key: string]: (obj: ISharedObject) => any } = {};
  const runtimeConfig = useRuntimeConfig();
  const user_manager = useUser();
  const connection = ref<WebSocket>();
  const toSend: Array<ISharedObject> = [];

  const toWatch = ref<Array<string>>([]);
  async function connect(instruments: Array<string>) {
    toWatch.value = instruments;
    connection.value = await new WebSocket(
      `${runtimeConfig.public.VUE_WSS_Host}${instruments.join(
        ","
      )}?access_token=${user_manager.getToken?.replace("Bearer ", "")}` ??
        `wss://bourse.asr24.com/api/ws/ws/${instruments.join(
          ","
        )}?access_token=${user_manager.getToken?.replace("Bearer ", "")}`
    );
    connection.value.binaryType = "arraybuffer";
    connection.value.onmessage = (msg) => {
      if (typeof msg.data == "object") {
        const resp: ISharedObject = decode(msg.data) as ISharedObject;
        if (handlers[resp.typ]) {
          handlers[resp.typ](resp);
        } else {
          console.log(
            "Message-Type '" + resp.typ + "' is unhandled!",
            decode(resp.obj ?? [0])
          );
        }
      }
    };
    connection.value.onopen = () => {
      console.log(new Date(), "WS Connected.");
      for (let i in toSend) {
        send(toSend[i]);
      }
      toSend.splice(0, toSend.length);
    };
    connection.value.onclose = reconnect;
  }

  function send(data: ISharedObject) {
    if (connection.value?.readyState == 1) connection.value?.send(encode(data));
    else toSend.push(data);
  }

  function reconnect() {
    setTimeout(() => {
      connect(toWatch.value);
    }, 2000);
  }

  function registerHandler(type: string, handler: (obj: ISharedObject) => any) {
    handlers[type] = handler;
  }

  return {
    connect,
    registerHandler,
    send,
  };
});
