export const ADMIN_EMAIL = 'admin@gmail.com';

export const PRODUCT_COLLECTION_NAME = 'Products';
export const CATEGORY_COLLECTION_NAME = 'Categories';

export enum PRODUCT_TYPE {
    AIR_COOLER = 'air_cooler',
    CAMERA = 'camera',
    HEADPHONE = 'headphone',
    KEYBOARD = 'keyboard',
    LAPTOP = 'laptop',
    MOBILE_PHONE = 'mobile_phone',
    REFRIGERATOR = 'refrigerator',
    TABLET = 'tablet',
    TELEVISION = 'television',
    WATER_PURIFIER = 'water_purifier'
}

// List of product can be chosed from dropdown in Admin Home Page
export const LIST_OF_CREATABLE_PRODUCT_OPTION = [
    {
        name: 'air cooler',
        value: PRODUCT_TYPE.AIR_COOLER
    },
    {
        name: 'camera',
        value: PRODUCT_TYPE.CAMERA
    },
    {
        name: 'headphone',
        value: PRODUCT_TYPE.HEADPHONE
    },
    {
        name: 'keyboard',
        value: PRODUCT_TYPE.KEYBOARD
    },
    {
        name: 'laptop',
        value: PRODUCT_TYPE.LAPTOP
    },
    {
        name: 'mobile phone',
        value: PRODUCT_TYPE.MOBILE_PHONE
    },
    {
        name: 'refrigerator',
        value: PRODUCT_TYPE.REFRIGERATOR
    },
    {
        name: 'tablet',
        value: PRODUCT_TYPE.TABLET
    },
    {
        name: 'television',
        value: PRODUCT_TYPE.TELEVISION
    },
    {
        name: 'water purifier',
        value: PRODUCT_TYPE.WATER_PURIFIER
    },
]

// All the availables filter options for products in Client Home Page
export const FILTER_OPTIONS = {
    BRANDS: [
        {
            name: 'Apple',
            value: 'apple'
        },
        {
            name: 'Samsung',
            value: 'samsung'
        },
        {
            name: 'Xiaomi',
            value: 'xiaomi'
        },
        {
            name: 'Sony',
            value: 'sony'
        },
        {
            name: 'Asus',
            value: 'asus'
        },
        {
            name: 'Lenovo',
            value: 'lenovo'
        },
    ],
    PRICES_CHIP: [
        {
            name: 'Below 2M',
            value: 1
        },
        {
            name: '2M - 4M',
            value: 2
        },
        {
            name: '4M - 7M',
            value: 3
        },
        {
            name: '7M - 13M',
            value: 4
        },
        {
            name: '13M - 20M',
            value: 5
        },
        {
            name: 'Above 20M',
            value: 6
        },
    ],
    PRICE_RANGE: {
        min: 300,
        max: 53_000_000
    }
}