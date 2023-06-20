import {defineStore} from "pinia";

export const useStockIndex =
    defineStore("stockIndex", () => {
        const state: any = reactive({
            dataFromTSETMC: [
                {
                    index: "بازار اول فرابورس",
                    last: "9,939.61",
                    change: "46.03",
                    percent: "0.47",
                    maximum: "9,939.61",
                    minimum: "9,874.57"
                },
                {
                    index: "بازار دوم فرابورس",
                    last: "10,540.82",
                    change: "(22.08)",
                    percent: "0.21",
                    maximum: "10,540.82",
                    minimum: "10,504.12"
                },
                {
                    index: "شاخص اركان و نهادهاي مالي",
                    last: "673.91\t",
                    change: "5.35",
                    percent: "0.79",
                    maximum: "673.91",
                    minimum: "669.05"
                },
                {
                    index: "شاخص چوب",
                    last: "358.07",
                    change: "12.99",
                    percent: "3.76",
                    maximum: "358.07",
                    minimum: "354.36"
                },
                {
                    index: "شاخص دستگاه هاي برقي",
                    last: "123.09",
                    change: "3.73",
                    percent: "2.94",
                    maximum: "124.95",
                    minimum: "123.09"
                },
                {
                    index: "شاخص فني مهندسي",
                    last: "576.88",
                    change: "10.46",
                    percent: "1.78",
                    maximum: "584.89",
                    minimum: "576.88"
                },
                {
                    index: "شاخص قيمت فرابورس",
                    last: "6,967.55",
                    change: "0.49",
                    percent: "0.01",
                    maximum: "6,967.55",
                    minimum: "6,921.65"
                },
                {
                    index: "شاخص قيمت هم وزن فرابورس",
                    last: "43,447.90",
                    change: "189.17",
                    percent: "0.43",
                    maximum: "43,448.42",
                    minimum: "43,343.32"
                },
                {
                    index: "شاخص كل فرابورس",
                    last: "27,816.41",
                    change: "1.97",
                    percent: "0.01",
                    maximum: "27,816.42",
                    minimum: "27,633.16"
                },
                {
                    index: "شاخص كل هم وزن فرابورس",
                    last: "135,537.20",
                    change: "589.98",
                    percent: "0.43",
                    maximum: "135,538.80",
                    minimum: "135,210.96"
                },
                {
                    index: "شاخص لاستيك",
                    last: "149.01",
                    change: "6.51",
                    percent: "4.19",
                    maximum: "152.01",
                    minimum: "148.24"
                },
                {
                    index: "شاخص ماشين آلات فرابورس",
                    last: "197.09",
                    change: "0.43",
                    percent: "0.22",
                    maximum: "197.09",
                    minimum: "196.56"
                }
            ],
            dataFromTSETMC2: [
                {
                    index: "زراعت",
                    last: "349,047.49",
                    change: "6781.75",
                    percent: "1.91",
                    maximum: "350,675.10",
                    minimum: "348,989.60"
                },
                {
                    index: "ذغال سنگ",
                    last: "58,608.22",
                    change: "2567.80",
                    percent: "4.20",
                    maximum: "60,895.73",
                    minimum: "58,444.24"
                },
                {
                    index: "كانه فلزي",
                    last: "582,946.84",
                    change: "1088.66",
                    percent: "0.19",
                    maximum: "582,946.84",
                    minimum: "581,650.50"
                },
                {
                    index: "ساير معادن",
                    last: "491,657.05",
                    change: "17090.10",
                    percent: "17090.10",
                    maximum: "492,481.72",
                    minimum: "489,790.90"
                },
                {
                    index: "منسوجات",
                    last: "27,964.11",
                    change: "212.45",
                    percent: "0.75",
                    maximum: "28,176.56",
                    minimum: "27,913.80"
                },
                {
                    index: "محصولات چرمي",
                    last: "41,324.84",
                    change: "0",
                    percent: "0",
                    maximum: "41,324.84",
                    minimum: "41,324.84"
                },
                {
                    index: "محصولات چوبي",
                    last: "1,103,039.28",
                    change: "51714.49",
                    percent: "4.48",
                    maximum: "1,152,162.02",
                    minimum: "1,103,039.28"
                },
                {
                    index: "محصولات كاغذ",
                    last: "108,749.94",
                    change: "1247.03",
                    percent: "1.16",
                    maximum: "108,767.51",
                    minimum: "108,165.97"
                },
                {
                    index: "انتشار و چاپ",
                    last: "1,435,660.12",
                    change: "14465.00",
                    percent: "1.00",
                    maximum: "1,449,740.19",
                    minimum: "1,435,660.12"
                },
                {
                    index: "فراورده نفتي",
                    last: "9,982,898.92",
                    change: "164864.44",
                    percent: "1.68",
                    maximum: "9,982,898.92",
                    minimum: "9,774,520.89"
                },
                {
                    index: "لاستيك",
                    last: "401,938.88",
                    change: "1165.85",
                    percent: "0.29",
                    maximum: "401,938.88",
                    minimum: "400,105.38"
                },
                {
                    index: "فلزات اساسي",
                    last: "1,528,626.30",
                    change: "2219.73",
                    percent: "0.14",
                    maximum: "1,531,801.13",
                    minimum: "1,528,272.60"
                },{
                    index: "محصولات فلزي",
                    last: "316,500.14",
                    change: "1775.68",
                    percent: "0.56",
                    maximum: "316,418.38",
                    minimum: "316,418.38"
                },
                {
                    index: "ماشين آلات",
                    last: "393,587.72",
                    change: "10324.40",
                    percent: "2.56",
                    maximum: "401,922.78",
                    minimum: "393,563.17"
                },
                {
                    index: "دستگاههاي برقي",
                    last: "6,713,925.20",
                    change: "10638.12",
                    percent: "0.16",
                    maximum: "6,713,925.20",
                    minimum: "6,626,253.41"
                },
                {
                    index: "6,626,253.41",
                    last: "70,303.83",
                    change: "2948.35",
                    percent: "4.38",
                    maximum: "70,303.83",
                    minimum: "70,303.83"
                },
                {
                    index: "ابزار پزشكي",
                    last: "10,244.34",
                    change: "0",
                    percent: "0",
                    maximum: "0",
                    minimum: "0"
                },
                {
                    index: "خودرو",
                    last: "359,270.57",
                    change: "1896.58",
                    percent: "0.53",
                    maximum: "359,270.57",
                    minimum: "355,031.18"
                },
                {
                    index: "حمل و نقل",
                    last: "1,125.20",
                    change: "0",
                    percent: "0",
                    maximum: "0",
                    minimum: "0"
                },
                {
                    index: "مبلمان",
                    last: "272.70",
                    change: "0",
                    percent: "0",
                    maximum: "0",
                    minimum: "0"
                },
                {
                    index: "قند و شكر",
                    last: "188,821.03",
                    change: "1198.26",
                    percent: "0.63",
                    maximum: "189,777.43",
                    minimum: "188,614.84"
                },
                {
                    index: "چند رشته اي ص",
                    last: "279,733.90",
                    change: "760.76",
                    percent: "0.27",
                    maximum: "279,733.90",
                    minimum: "278,542.38"
                },
                {
                    index: "تامين آب، برق، گاز",
                    last: "5,157.23",
                    change: "6.29",
                    percent: "0.12",
                    maximum: "5,157.23",
                    minimum: "5,150.47"
                },
                {
                    index: "غذايي بجز قند",
                    last: "70,841.55",
                    change: "54.94",
                    percent: "0.08",
                    maximum: "71,113.88",
                    minimum: "70,833.27"
                },
                {
                    index: "مواد دارويي",
                    last: "201,465.34",
                    change: "97.06",
                    percent: "0.05",
                    maximum: "201,465.34",
                    minimum: "201,031.09"
                },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
                // {
                //     index: "",
                //     last: "",
                //     change: "",
                //     percent: "",
                //     maximum: "",
                //     minimum: ""
                // },
            ]
        });
        const stockIndexData = computed(() => state.dataFromTSETMC);
        const stockIndexData2 = computed(() => state.dataFromTSETMC2);

        return {
            stockIndexData,
            stockIndexData2
        };
    });
