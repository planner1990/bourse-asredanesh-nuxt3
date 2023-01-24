import {TabItem, OrderFlags} from "@/types";


const panels: Array<TabItem> = [
    {
        id: "orders",
        title: "bottom-panel.orders.index",
        children: [
            {
                path: "orders?offset=0&length=20",
                title: "bottom-panel.orders.open",
                deletable: false,
                match: /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+)|(flags=(?!1|8|54)[^\/&]+))[&]?)*([\/]{1})?)$/g,

            },
            {
                path: `orders?offset=0&length=20&flags=${OrderFlags.Draft}`,
                title: "bottom-panel.orders.today",
                deletable: false,
                match: /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+)|(flags=1))[&]?)*([\/]{1})?)$/g,

            },
            {
                path: `orders?offset=0&length=20&flags=${OrderFlags.Confirmed | OrderFlags.PreOpening | OrderFlags.Created | OrderFlags.Sent}`,
                title: "bottom-panel.orders.actives",
                deletable: false,
                match: /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+)|(flags=54))[&]?)*([\/]{1})?)$/g,

            },
            {
                path: `orders?offset=0&length=20&flags=${OrderFlags.Draft}`,
                title: "bottom-panel.orders.drafts",
                deletable: false,
                match: /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+)|(flags=1))[&]?)*([\/]{1})?)$/g,

            },
            {
                path: `orders?offset=0&length=20&flags=${OrderFlags.Cancelled}`,
                title: "bottom-panel.orders.canceled",
                deletable: false,
                match: /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+)|(flags=8))[&]?)*([\/]{1})?)$/g,

            },
        ],
        match: /^\/watchlist\/.+\/orders([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        path: "orders?offset=0&length=20",
        deletable: false,
        const: true
    },
    {
        id: "furtherInformation",
        title: "bottom-panel.completeInfo.index",
        children: [
            {
                path: "furtherInformation",
                title: "bottom-panel.furtherInformation.depth",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation$/g,
            },
            {
                path: "furtherInformation/myGroups",
                title: "bottom-panel.furtherInformation.myGroups",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/myGroups([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "furtherInformation/holdersGroups",
                title: "bottom-panel.furtherInformation.holdersGroups",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/holdersGroups([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "furtherInformation/holdersCombination",
                title: "bottom-panel.furtherInformation.holdersCombination",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/holdersCombination([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "furtherInformation/type",
                title: "bottom-panel.furtherInformation.type",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/type([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "furtherInformation/trades",
                title: "bottom-panel.furtherInformation.trades",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/trades([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "furtherInformation/papers",
                title: "bottom-panel.furtherInformation.papers",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/papers([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
        ],
        match: /^\/watchlist\/.+\/furtherInformation$/g,
        path: "furtherInformation",
        deletable: false,
        const: true
    },
    {
        id: "tradesHistory",
        title: "bottom-panel.archive.index",
        match: /^\/watchlist\/.+\/archive\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        children: [
            {
                path: "archive/tradesHistory?offset=0&length=20",
                title: "bottom-panel.archive.tradesHistory",
                deletable: false,
                match: /^\/watchlist\/.+\/archive\/tradesHistory([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "archive/holdersCompition",
                title: "bottom-panel.archive.holdersCompition",
                deletable: false,
                match: /^\/watchlist\/.+\/archive\/holdersCompition([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "archive/type?offset=0&length=20",
                title: "bottom-panel.archive.type",
                deletable: false,
                match: /^\/watchlist\/.+\/archive\/type([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
        ],
        deletable: false,
        path: "archive/tradesHistory?offset=0&length=20",
        const: true
    },
    {
        id: "statisticsKeys",
        title: "bottom-panel.statisticsKeys.index",
        match: /^\/watchlist\/.+\/statisticsKeys$/g,
        children: [
            {
                path: "statisticsKeys",
                title: "bottom-panel.statisticsKeys.marketTrend",
                deletable: false,
                match: /^\/watchlist\/.+\/statisticsKeys$/g,

            },
            {
                path: "statisticsKeys/technical",
                title: "bottom-panel.statisticsKeys.technical",
                deletable: false,
                match: /^\/watchlist\/.+\/statisticsKeys\/technical([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                path: "statisticsKeys/fundamental",
                title: "bottom-panel.statisticsKeys.fundamental",
                deletable: false,
                match: /^\/watchlist\/.+\/statisticsKeys\/fundamental([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            }
        ],
        deletable: false,
        path: "statisticsKeys",
        const: true
    },
    {
        id: "more",
        title: "bottom-panel.more.index",
        match: /^\/watchlist\/.+\/more$/g,
        children: [
            {
                path: "more",
                title: "bottom-panel.more.presentation",
                deletable: false,
                match: /^\/watchlist\/.+\/more$/g,
            },
            {
                path: "more/directorate",
                title: "bottom-panel.more.directorate",
                deletable: false,
                match: /^\/watchlist\/.+\/more\/directorate([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
        ],
        path: "more",
        deletable: false,
        const: true
    },
    {
        id: "stockIndex",
        title: "bottom-panel.stockIndex.index",
        match: /^\/watchlist\/.+\/stockIndex$/g,
        children: [
            {
                path: "stockIndex",
                title: "bottom-panel.stockIndex.index",
                deletable: true,
                match: /^\/watchlist\/.+\/stockIndex$/g,
            },
            {
                path: "stockIndex/otc",
                title: "bottom-panel.stockIndex.otc",
                deletable: true,
                match: /^\/watchlist\/.+\/stockIndex\/otc([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
        ],
        path: "stockIndex",
        deletable: true,
        const: false
    },
    {
        id: "chatRoom",
        title: "bottom-panel.chatRoom.index",
        match: /^\/watchlist\/.+\/chatRoom\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        children: [
            {
                path: "chatRoom/room",
                title: "bottom-panel.chatRoom.index",
                deletable: true,
                match: /^\/watchlist\/.+\/chatRoom\/room([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            }
        ],
        path: "chatRoom/room",
        deletable: true,
        const: false
    }
];

export default panels;
