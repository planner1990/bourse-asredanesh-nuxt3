import { TabItem, OrderFlags, AutoCompleteItem } from "@/types";
import { DateTime } from "luxon";

const now = DateTime.now();

const panels: Array<TabItem> = [
    {
        id: "orders",
        title: "bottom-panel.orders.index",
        children: [
            {
                id: "orders.all",
                path: `orders?offset=0&length=20&flags=${OrderFlags.Confirmed |
                    OrderFlags.PreOpening |
                    OrderFlags.Created |
                    OrderFlags.Sent
                    }`,
                title: "bottom-panel.orders.open",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+)|(flags=(?!1|8|64)[^\/&]+))[&]?)*([\/]{1})?)(?!&today)$/g,
            },
            {
                id: "orders.today",
                path: `orders?from=${now.toISODate()}&until=${now.toISODate()}&offset=0&length=20&today`,
                title: "bottom-panel.orders.today",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/orders([?]((((?!flags)[^=\/&]+=[^\/&]+))[&]?)+([\/]{1})?)(&today)$/g,
            },
            {
                id: "orders.actives",
                path: `orders?offset=0&length=20&flags=${OrderFlags.Done
                    }`,
                title: "bottom-panel.orders.actives",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/orders[?]((?!flags)[^&=\/]+[=][^&=\/]+[&]?)*(flags=64[&]?)((?!flags)[^&=\/]+[=][^&=\/]+[&]?)*$/g,
            },
            {
                id: "orders.drafts",
                path: `orders?offset=0&length=20&flags=${OrderFlags.Draft}`,
                title: "bottom-panel.orders.drafts",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/orders[?]((?!flags)[^&=\/]+[=][^&=\/]+[&]?)*(flags=1[&]?)((?!flags)[^&=\/]+[=][^&=\/]+[&]?)*$/g,
            },
            {
                id: "orders.canceled",
                path: `orders?offset=0&length=20&flags=${OrderFlags.Cancelled}`,
                title: "bottom-panel.orders.canceled",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/orders[?]((?!flags)[^&=\/]+[=][^&=\/]+[&]?)*(flags=8[&]?)((?!flags)[^&=\/]+[=][^&=\/]+[&]?)*$/g,
            },
        ],
        match: /^\/watchlist\/.+\/orders([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        path: `orders?offset=0&length=20&flags=${OrderFlags.Confirmed |
            OrderFlags.PreOpening |
            OrderFlags.Created |
            OrderFlags.Sent
            }`,
        deletable: false,
        show: true,
    },
    {
        id: "furtherInformation",
        title: "bottom-panel.completeInfo.index",
        children: [
            {
                id: "furtherInformation.depth",
                path: "furtherInformation",
                title: "bottom-panel.furtherInformation.depth",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/furtherInformation$/g,
            },
            {
                id: "furtherInformation.type",
                path: "furtherInformation/type",
                title: "bottom-panel.furtherInformation.type",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/furtherInformation\/type$/g,
            },
            {
                id: "furtherInformation.dependentSymbols",
                path: "furtherInformation/dependentSymbols",
                title: "bottom-panel.furtherInformation.dependentSymbols",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/furtherInformation\/dependentSymbols$/g,
            },
            {
                id: "furtherInformation.typesOfPapers",
                path: "furtherInformation/typesOfPapers",
                title: "bottom-panel.furtherInformation.typesOfPapers",
                deletable: false,
                match: /^\/watchlist\/.+\/furtherInformation\/typesOfPapers$/g,
                dropDown: {
                    items: [
                        new AutoCompleteItem("1", "حق تقدم"),
                        new AutoCompleteItem("2", "گواهی سپرده"),
                        new AutoCompleteItem("3", "اوراق مشارکت"),
                        new AutoCompleteItem("4", "آتی سهام"),
                        new AutoCompleteItem("5", "اختیار معامله خرید"),
                        new AutoCompleteItem("6", "اختیار معامله فروش"),
                        new AutoCompleteItem("7", "اختیار معامله خرید تبعی"),
                        new AutoCompleteItem("8", "اختیار معامله فروش تبعی"),
                        new AutoCompleteItem("9", "اسناد خزانه"),
                        new AutoCompleteItem("10", "اختیار معامله خرید اسناد خزانه"),
                        new AutoCompleteItem("11", "اختیار معامله فروش اسناد خزانه"),
                        new AutoCompleteItem("12", "صکوک ساخت"),
                        new AutoCompleteItem("13", "صکوک دین"),
                        new AutoCompleteItem("14", "صکوک مرابحه"),
                        new AutoCompleteItem("15", "صکوک اجاره"),
                        new AutoCompleteItem("16", "صکوک رهن"),
                        new AutoCompleteItem("17", "صکوک منفعت")
                    ],
                    show: false
                }
            },
            {
                id: "furtherInformation.industryCohorts",
                path: "furtherInformation/IndustryCohorts",
                title: "bottom-panel.furtherInformation.industryCohorts",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/furtherInformation\/IndustryCohorts$/g,
            },
            {
                id: "furtherInformation.shareholders&Owners",
                path: "furtherInformation/shareholdersAndOwners",
                title: "bottom-panel.furtherInformation.shareholders&Owners",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/furtherInformation\/shareholdersAndOwners$/g,
            },
            {
                id: "furtherInformation.shareholderGroups",
                path: "furtherInformation/shareholderGroups",
                title: "bottom-panel.furtherInformation.shareholderGroups",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/furtherInformation\/shareholderGroups$/g,
            },
        ],
        match: /^\/watchlist\/.+\/furtherInformation/g,
        path: "furtherInformation",
        deletable: false,
        show: true,
    },
    {
        id: "tradesHistory",
        title: "bottom-panel.archive.index",
        match: /^\/watchlist\/.+\/archive\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        children: [
            {
                id: "archive.tradesHistory",
                path: "archive/tradesHistory?offset=0&length=20",
                title: "bottom-panel.archive.tradesHistory",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/archive\/tradesHistory([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "archive.holdersCompition",
                path: "archive/holdersCompition",
                title: "bottom-panel.archive.holdersCompition",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/archive\/holdersCompition([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "archive.type",
                path: "archive/type?offset=0&length=20",
                title: "bottom-panel.archive.type",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/archive\/type([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
        ],
        deletable: false,
        path: "archive/tradesHistory?offset=0&length=20",
        show: true,
    },
    {
        id: "statisticsKeys",
        title: "bottom-panel.statisticsKeys.index",
        match: /^\/watchlist\/.+\/statisticsKeys/g,
        children: [
            {
                id: "statisticsKeys.boardReading",
                path: "statisticsKeys/boardReading",
                title: "bottom-panel.statisticsKeys.boardReading",
                deletable: false,
                match: /^\/watchlist\/.+\/boardReading$/g,
                dropDown: {
                    items: [
                        new AutoCompleteItem("1", "بیشترین ورود نقدینگی حقیقی"),
                        new AutoCompleteItem("2", "بیشترین ورود نقدینگی حقوقی"),
                        new AutoCompleteItem("3", "حجم های مشکوک"),
                        new AutoCompleteItem("4", "بیشترین سرانه خرید حقیقی"),
                        new AutoCompleteItem("5", "بیشترین سرانه خرید حقوقی")
                    ],
                    show: false
                }
            },
            {
                id: "statisticsKeys.descriptive",
                path: "statisticsKeys/descriptive",
                title: "bottom-panel.statisticsKeys.descriptive",
                deletable: false,
                match: /^\/watchlist\/.+\/descriptive$/g,
                dropDown: {
                    items: [
                        new AutoCompleteItem("1", "صف خرید"),
                        new AutoCompleteItem("2", "وصف فروش"),
                        new AutoCompleteItem("3", "آستانه صف خرید"),
                        new AutoCompleteItem("4", "آستانه صف فروش")
                    ],
                    show: false
                }
            },
            {
                id: "statisticsKeys.technical",
                path: "statisticsKeys/technical",
                title: "bottom-panel.statisticsKeys.technical",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/statisticsKeys\/technical([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                dropDown: {
                    items: [
                        new AutoCompleteItem("1", "احتمال پایان روند نزولی"),
                        new AutoCompleteItem("2", "احتمال پایان روند صعودی"),
                        new AutoCompleteItem("3", "نقطه اشباع خرید rsi")
                    ],
                    show: false
                }
            },
            {
                id: "statisticsKeys.fundamental",
                path: "statisticsKeys/fundamental",
                title: "bottom-panel.statisticsKeys.fundamental",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/statisticsKeys\/fundamental([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                dropDown: {
                    items: [
                        new AutoCompleteItem("1", "بزرگتر از قیمت ذاتی"),
                        new AutoCompleteItem("2", "کوچکتر از قیمت ذاتی")
                    ],
                    show: false
                }
            },
        ],
        deletable: false,
        path: "statisticsKeys/boardReading",
        show: true,
    },
    {
        id: "more",
        title: "bottom-panel.more.index",
        match: /^\/watchlist\/.+\/more/g,
        children: [
            {
                id: "more.presentation",
                path: "more",
                title: "bottom-panel.more.presentation",
                deletable: false,
                match: /^\/watchlist\/.+\/more$/g,
            },
            {
                id: "more.directorate",
                path: "more/directorate",
                title: "bottom-panel.more.directorate",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/directorate([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.changeOfStatus",
                path: "more/changeOfStatus",
                title: "bottom-panel.more.changeOfStatus",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/changeOfStatus([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.paperSpecifications",
                path: "more/paperSpecifications",
                title: "bottom-panel.more.paperSpecifications",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/paperSpecifications([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.paperInformation",
                path: "more/paperInformation",
                title: "bottom-panel.more.paperInformation",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/paperInformation([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.paperPillars",
                path: "more/paperPillars",
                title: "bottom-panel.more.paperPillars",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/paperPillars([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.paymentDue",
                path: "more/paymentDue",
                title: "bottom-panel.more.paymentDue",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/paymentDue([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.efficiencyYTM",
                path: "more/efficiencyYTM",
                title: "bottom-panel.more.efficiencyYTM",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/efficiencyYTM([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
            {
                id: "more.efficiencyYTS",
                path: "more/efficiencyYTS",
                title: "bottom-panel.more.efficiencyYTS",
                deletable: false,
                match:
                    /^\/watchlist\/.+\/more\/efficiencyYTS([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            }
        ],
        path: "more",
        deletable: false,
        show: true,
    },
    {
        id: "stockIndex",
        title: "bottom-panel.stockIndex.index",
        match: /^\/watchlist\/.+\/stockIndex/g,
        children: [
            {
                id: "stockIndex.index",
                path: "stockIndex",
                title: "bottom-panel.stockIndex.index",
                deletable: true,
                match: /^\/watchlist\/.+\/stockIndex$/g,
            },
            {
                id: "stockIndex.otc",
                path: "stockIndex/otc",
                title: "bottom-panel.stockIndex.otc",
                deletable: true,
                match:
                    /^\/watchlist\/.+\/stockIndex\/otc$/g,
            },
        ],
        path: "stockIndex",
        deletable: true,
        show: false,
    },
    {
        id: "chatRoom",
        title: "bottom-panel.chatRoom.index",
        match: /^\/watchlist\/.+\/chatRoom\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        children: [
            {
                id: "chatRoom.index",
                path: "chatRoom/room",
                title: "bottom-panel.chatRoom.index",
                deletable: true,
                match:
                    /^\/watchlist\/.+\/chatRoom\/room([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            },
        ],
        path: "chatRoom/room",
        deletable: true,
        show: false,
    },
];

export default panels;
