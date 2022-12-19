import {TabItem} from "~/types";

export default {
    getMenuItems,
};

export function getMenuItems(): Array<TabItem> {
    return [
        {
            id: "portfolio",
            icon: "isax-graph",
            title: "menu.portfolio.index",
            match: /^\/watchlist\/.+\/portfolio\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            children: [
                {
                    icon: "isax-graph",
                    title: "menu.portfolio.realtime",
                    path: "portfolio/realtime",
                    color: "success",
                    match: /^\/watchlist\/.+\/portfolio\/realtime([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "isax-graph",
                    title: "menu.portfolio.brokerage",
                    path: "portfolio/brokerage",
                    color: "success",
                    match: /^\/watchlist\/.+\/portfolio\/brokerage([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                }
            ],
            path: "portfolio/realtime",
            const: false,
            deletable: true
        },
        {
            id: "accounting",
            icon: "isax-calculator",
            title: "menu.accounting",
            match: /^\/watchlist\/.+\/accounting\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            children: [
                {
                    icon: "isax-card-receive",
                    title: "menu.deposit",
                    path: "accounting/deposit",
                    color: "success",
                    match: /^\/watchlist\/.+\/accounting\/deposit([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false

                },
                {
                    icon: "isax-card-receive",
                    title: "menu.receiptRegister",
                    path: "accounting/receiptRegister",
                    color: "success",
                    match: /^\/watchlist\/.+\/accounting\/receiptRegister([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "isax-card-send",
                    title: "menu.refund",
                    path: "accounting/refund",
                    color: "error",
                    match: /^\/watchlist\/.+\/accounting\/refund([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "lotfi-empty-wallet-tick",
                    title: "menu.credits",
                    path: "accounting/credits",
                    match: /^\/watchlist\/.+\/accounting\/credits([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
            ],
            path: "accounting/deposit",
            const: false,
            deletable: true
        },
        {
            id: "trades",
            icon: "isax-money-change",
            title: "menu.trades",
            match: /^\/watchlist\/.+\/trades\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            children: [
                {
                    icon: "lotfi-receipt-edit-2",
                    title: "menu.tradesReport",
                    path: "trades/report",
                    match: /^\/watchlist\/.+\/trades\/report([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "lotfi-group",
                    title: "menu.switchBrokerage",
                    path: "trades/switchBrokerage",
                    color: "warning",
                    match: /^\/watchlist\/.+\/trades\/switchBrokerage([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "lotfi-receipt-edit-1",
                    title: "menu.switchBrokerageReport",
                    path: "trades/switchBrokerageReport",
                    match: /^\/watchlist\/.+\/trades\/switchBrokerageReport([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
            ],
            path: "trades/report",
            const: false,
            deletable: true
        },
        {
            id: "alerts",
            icon: "isax-presention-chart",
            title: "menu.alerts",
            path: "alerts",
            match: /^\/watchlist\/.+\/alerts\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "drafts",
            icon: "isax-convert-card-outline",
            title: "menu.drafts",
            path: "drafts",
            match: /^\/watchlist\/.+\/drafts\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "conditional",
            icon: "lotfi-wallet-money",
            title: "menu.conditionalTrade",
            path: "conditional-trade",
            match: /^\/watchlist\/.+\/conditional-trade\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "filters",
            icon: "isax-filter-edit",
            title: "menu.filter",
            path: "filters",
            match: /^\/watchlist\/.+\/filters\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "technical",
            icon: "isax-status-up",
            title: "menu.technical",
            path: "technical",
            match: /^\/watchlist\/.+\/technical\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "profit",
            icon: "lotfi-note-2",
            title: "menu.profit",
            path: "profit",
            match: /^\/watchlist\/.+\/profit\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "marketMap",
            icon: "isax-map-outline",
            title: "menu.marketMap",
            path: "market-map",
            match: /^\/watchlist\/.+\/market-map\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [],
        },
        {
            id: "settings",
            icon: "isax-setting-2",
            title: "menu.settings.index",
            match: /^\/watchlist\/.+\/settings\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
            const: false,
            deletable: true,
            children: [
                {
                    icon: "isax-graph",
                    title: "menu.settings.userInformation",
                    path: "settings/userInformation",
                    color: "success",
                    match: /^\/watchlist\/.+\/settings\/userInformation[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "isax-graph",
                    title: "menu.settings.entryAndExitHistory",
                    path: "settings/entryAndExitHistory",
                    color: "success",
                    match: /^\/watchlist\/.+\/settings\/entryAndExitHistory[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
                {
                    icon: "isax-graph",
                    title: "menu.settings.agreements",
                    path: "settings/agreements",
                    color: "success",
                    match: /^\/watchlist\/.+\/settings\/agreements[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
                    deletable: false
                },
            ],
            path: "settings/userInformation",
        },
    ];
}
