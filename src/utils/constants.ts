export const TABS_ID = {
    CHEAP: "cheap",
    LOW: "expensive",
    DISCOUNT: "discount",
    DEFAULT: "default",
}
export type Tab = {
    id: string,
    title: string,
}

export const TABS = [
    {
        id: TABS_ID.DEFAULT,
        title: "По умолчанию"
    },
    {
        id: TABS_ID.CHEAP,
        title: "Сначала дешевые",
    },
    {
        id: TABS_ID.LOW,
        title: "Сначала дорогие",
    },
    {
        id: TABS_ID.DISCOUNT,
        title: "По скидке"
    },

]

//pagination
export const MAX_PRODUCT_PER_PAGE = 12;
export const START_RANGE_PAGE = 2
export const RANGE_PAGINATION = 3;
export const END_RANGE_PAGE = START_RANGE_PAGE + RANGE_PAGINATION - 1;