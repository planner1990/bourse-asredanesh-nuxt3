import {defineStore} from "pinia";
import {
    getMessage as GetMessage,
    getMessageFilters as GetMessageFilters,
    getMessageList as GetMessageList,
} from "~/repositories/oms/message_manager";
import {
    PaginatedResult,
    Message,
    MessageCode,
    AutoCompleteItem,
    MessageQuery,
    MessageFilter,
} from "@/types";
import {AxiosResponse} from "axios";
import {useAxios} from "../useAxios";

export const useMessages = defineStore("messages", () => {
    const state = reactive({
        categories: <
            Array<{
                title: string;
                bg: string;
                color: string;
                active: boolean;
                code: MessageCode;
            }>
            >[
            {
                title: "categories.marketModerator",
                bg: "tw-bg-primary tw-bg-opacity-10",
                color: "tw-text-primary",
                active: true,
                code: "RLC",
            },
            {
                title: "categories.codal",
                bg: "tw-bg-success tw-bg-opacity-10",
                color: "tw-text-success",
                active: false,
                code: "CODAL",
            },
            {
                title: "categories.tedan",
                bg: "tw-bg-error tw-bg-opacity-10",
                color: "tw-text-error",
                active: false,
                code: "TEDAN",
            },
            {
                title: "categories.news",
                bg: "tw-bg-info tw-bg-opacity-10",
                color: "tw-text-info",
                active: false,
                code: "NEWS",
            },
        ],
        origins: ["RLC"] as MessageCode[],
        _messagesCache: <{ [key: number]: Message }>{},
        messageQuery: new MessageQuery(
            0,
            10,
            new MessageFilter([], "2019-01-01T00:00:00", null)
        ),
        activeMessage: <Message | null>null,
    });

    const message_active = computed<Message | null>({
        get() {
            return state.activeMessage;
        },
        set(val) {
            state.activeMessage = val;
        },
    });

    const axios = useAxios().createInstance();

    async function getMessage(id: number): Promise<Message> {
        const msg = state._messagesCache[id];
        if (msg)
            return new Promise((resolve) => {
                resolve(msg);
            });
        const {data} = await GetMessage(id, axios);
        return data;
    }

    async function getMessages(
        searchModel: MessageQuery
    ): Promise<PaginatedResult<Message>> {
        //TODO Correct Message Cache
        const {data} = await GetMessageList(searchModel, axios);
        data.data.forEach((el) => {
            state._messagesCache[el.id] = el;
        });
        return data;
    }

    async function getMessageFilters(
        name: string
    ): Promise<AxiosResponse<PaginatedResult<AutoCompleteItem>>> {
        return await GetMessageFilters(name, axios);
    }

    function activeExactCategory(code: MessageCode) {
        state.categories.forEach((item) => {
            item.active = item.code === code;
        });
        state.origins.splice(0, state.origins.length);
        state.origins.push(code);
    }

    return {
        state,
        message_active,
        getMessage,
        getMessages,
        getMessageFilters,
        activeExactCategory,
    };
});
