import {defineStore} from "pinia";

export const useFurtherInformation =
    defineStore("further-information", () => {
        const state: any = reactive({
            queue: [],
        });
        const queueData = computed(() => state.queue);

        function setQueueData(data: any) {
            if (state.queue) {
                state.queue = []
            }
            state.queue.push(data);
        }

        function setInstrumentIdAndSectorId(instrumentId: number, sectorId: number) {
            state.insAndSector.instrumentId = instrumentId;
            state.insAndSector.sectorId = sectorId;
        }

        return {
            queueData,
            setQueueData,
            setInstrumentIdAndSectorId
        };
    });
