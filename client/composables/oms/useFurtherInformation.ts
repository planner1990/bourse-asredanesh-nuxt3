import {defineStore} from "pinia";

export const useFurtherInformation =
    defineStore("further-information", () => {
        const state: any = reactive({
            queue: [],
            insAndSector: {
                instrumentId: null,
                sectorId: null
            }
        });
        const queueData = computed(() => state.queue);
        const instrumentIdAndSectorId = computed(() => state.insAndSector);

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
            instrumentIdAndSectorId,
            setInstrumentIdAndSectorId
        };
    });
