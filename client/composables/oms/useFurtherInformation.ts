import {defineStore} from "pinia";

export const useFurtherInformation =
    defineStore("further-information", () => {
        const state: any = reactive({
            queue: []
        });
        const queueData = computed(() => state.queue);

        function setQueueData(data: any) {
            if (state.queue) {
                state.queue = []
            }
            state.queue.push(data);
        }

        return {
            queueData,
            setQueueData
        };
    });
