import { defineStore } from "pinia";
import { encode, decode } from "@msgpack/msgpack";
import { useUser } from ".";
import { Instrument, InstrumentCache, ISharedObject } from "@/types";

export const useWebSocket = defineStore("webSocket", () => {
  let connection: WebSocket | null = null;
  const handlers: { [key: string]: (obj: ISharedObject) => any } = {};
  const runtimeConfig = useRuntimeConfig();
  const user_manager = useUser();

  const toWatch = ref<Array<string>>([]);
  function connect(instruments: Array<string>) {
    toWatch.value = instruments;
    connection = new WebSocket(
      `${runtimeConfig.public.VUE_WSS_Host}${instruments.join(
        ","
      )}?access_token=${user_manager.getToken?.replace("Bearer ", "")}` ??
        `wss://bourse.asr24.com/api/ws/ws/${instruments.join(
          ","
        )}?access_token=${user_manager.getToken?.replace("Bearer ", "")}`
    );
    connection.binaryType = "arraybuffer";
    connection.onmessage = (msg) => {
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
    connection.onopen = () => {
      console.log(new Date(), "WS Connected.");
    };
    connection.onclose = reconnect;
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
  };
});
