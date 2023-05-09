import {defineStore} from "pinia";
import {MessageOrigin, Notification} from "@/types";
import {NotificationState} from "@/types/stores";
import {getMessageSource} from "@/repositories/oms/message_manager";
import {useAxios} from "..";

export const useNotifications = defineStore("notifications", () => {
    const state = ref<NotificationState>({
        cache: reactive({}),
    });

    const axios = useAxios().createInstance();

    async function initNotifications(inst: Array<string>): Promise<any> {
        //TODO InitCache
        //Get message sources
        const {data} = await getMessageSource(inst, axios);
        const groupData = data.data.reduce((r, i, arr) => {
            r[i.instrumentCode] = r[i.instrumentCode] || [];
            r[i.instrumentCode].push({
                origin: i.origin,
                messagesCount: i.messagesCount,
            });
            return r;
        }, {} as { [key: string]: Array<{ origin: MessageOrigin; messagesCount: number }> });
        for (const d in groupData) {
            state.value.cache[d] = groupData[d].map((i) => ({
                type: "Administrative",
                params: {
                    origin: i.origin,
                    messagesCount: i.messagesCount,
                },
            }));
        }
        return state.value.cache;
    }

    function removeNotification(instrumentCode: string, origin: MessageOrigin) {
        const notifs = state.value.cache[instrumentCode];
        const notif = notifs.find(({params}) => params.origin === origin);
        if (notif)
            if (notif.params.messagesCount === 1) {
                notifs.splice(notifs.indexOf(notif), 1);
            } else {
                notif.params.messagesCount -= 1;
            }
    }

    return {
        state,
        initNotifications,
        removeNotification,
    };
});
