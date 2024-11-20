export const ADMIN_EMAIL = 'admin@gmail.com';

export const PRODUCT_COLLECTION_NAME = 'Products';
export const CATEGORY_COLLECTION_NAME = 'Categories';

export enum PRODUCT_TYPE {
    // AIR_COOLER = 'air_cooler',
    // CAMERA = 'camera',
    // HEADPHONE = 'headphone',
    KEYBOARD = 'keyboard',
    LAPTOP = 'laptop',
    MOBILE_PHONE = 'mobile_phone',
    // REFRIGERATOR = 'refrigerator',
    // TABLET = 'tablet',
    TELEVISION = 'television',
    // WATER_PURIFIER = 'water_purifier'
}

// List of product can be chosed from dropdown in Admin Home Page
export const LIST_OF_CREATABLE_PRODUCT_OPTION = [
    // {
    //     name: 'air cooler',
    //     value: PRODUCT_TYPE.AIR_COOLER
    // },
    // {
    //     name: 'camera',
    //     value: PRODUCT_TYPE.CAMERA
    // },
    // {
    //     name: 'headphone',
    //     value: PRODUCT_TYPE.HEADPHONE
    // },
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
    // {
    //     name: 'refrigerator',
    //     value: PRODUCT_TYPE.REFRIGERATOR
    // },
    // {
    //     name: 'tablet',
    //     value: PRODUCT_TYPE.TABLET
    // },
    {
        name: 'television',
        value: PRODUCT_TYPE.TELEVISION
    },
    // {
    //     name: 'water purifier',
    //     value: PRODUCT_TYPE.WATER_PURIFIER
    // },
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

export const PRODUCT_BADGE_LIST = [
    {
        name: 'máy giặt',
        tag: 'hot',
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/0a/b9/0ab938f5b5b2993d568351bceb721407.png'
    },
    {
        name: 'máy lọc nước',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/ff/40/ff40b05375a001ea1f246cfd81fcbd12.png'
    },
    {
        name: 'tủ lạnh',
        tag: '-40%',
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/64/85/6485154d19085e781f44d057f1c63c71.png'
    },
    {
        name: 'nồi cơm điện',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/2a/8c/2a8ca60d0f63068060068e3884032499.png'
    },
    {
        name: 'máy lạnh',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/48/a6/48a6bd2b6d7ad2712eb93772b3578deb.png'
    },
    {
        name: 'bếp từ',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/53/cf/53cfb39526ce0023c6ead5c3292923b9.png'
    },
    {
        name: 'tủ đông mát',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/5f/fc/5ffc124606fecac8c77bceb28b9c5c05.png'
    },
    {
        name: 'nồi chiên không dầu',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/3a/d7/3ad7a7605d2de79bd56d11f80c326d58.png'
    },
    {
        name: 'máy nước nóng',
        tag: 'hot',
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/e5/94/e594135d5eed6cc128fe2a9c62154ad9.png'
    },
    {
        name: 'gia dụng',
        tag: '-50%',
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/8c/1b/8c1b71a6a8fc062456825e6483b26e6b.png'
    },
    {
        name: 'tivi',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/64/d1/64d11a09c75ea322dbc547739886e1d5.png'
    },
    {
        name: 'máy lọc không khí',
        tag: 'hot',
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/04/2e/042e6d1427540a418b516a9576e79b20.png'
    },
    {
        name: 'máy sấy quần áo',
        tag: 'hot',
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/0c/c3/0cc360b738e93b746af289ba67029e57.png'
    },
    {
        name: 'hút bụi',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/ad/d4/add43c28ca2de72ffdef6c59b19bf7a7.png'
    },
    {
        name: 'loa',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/common/Common/00/55/0055c858a83557e51e539deedda6dd81.png'
    },
    {
        name: 'tất cả danh mục',
        tag: null,
        image: 'https://cdnv2.tgdd.vn/mwg-static/dmx/Common/9c/c7/9cc7b36387641fc1bdde6bb3909e4b07.png'
    },
]

export const ALSO_FIND_KEYWORDS = [
    "nồi cơm điện Bluestone",
    "iPhone 15",
    "nồi cơm điện Tiger",
    "nồi chiên Bluestone",
    "máy lọc nước Livotec",
    "hút mùi Hafele",
    "máy lọc nước Mutosi",
    "nồi cơm Electrolux",
    "máy lọc không khí Daikin",
    "macbook air m3",
    "BlueStone BLB-6035",
    "máy hút bụi Dreame",
    "máy lọc không khí Electrolux",
    "bếp từ Rapido",
    "Dreame h12 pro",
    "Panasonic F-60FEN",
    "bếp từ Junger",
    "Samsung Galaxy Z Flip 6",
    "Samsung Galaxy Z Fold 6",
    "điều hòa lg",
    "máy xay bluestone",
    "Galaxy Buds 3 Pro",
    "Galaxy Buds 3",
    "iPhone 16",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 16 Plus",
    "iPhone 16 128gb",
    "airpods 4"
];

export const BLOGS_LIST = {
    OFFERS: [
        {
            title: 'Giá sốc cuối tuần - Gia dụng giảm sốc đến 50%',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/1537365/hot-sale-gia-dung-cuoi-tuan638672602513894577.jpg'
        },
        {
            title: 'Đặc quyền bảo hành VIP Care cho dòng tủ lạnh Toshiba JAPANDi',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/1572115/dac-quyen-bao-hanh-vip-care-cho-dong-tu-lanh638672590191925678.jpg'
        },
        {
            title: 'Minigame: Săn coupon tháng mưa ngâu giảm cực sâu - Nhận ngay mã giảm đến 1.5 triệu đồng',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/1566290/ngay-doi-sale-vo-doi-dien-may-xanh-giam-den-50638671752580211403.jpg'
        },
        {
            title: 'Loa thanh Samsung giảm đến 70% khi mua kèm tivi Samsung',
            banner: 'https://cdn.tgdd.vn//News/Thumb/1436087/mua-tivi-samsung-giam-den-45-cho-2-1200x628.jpg'
        },
    ],
    PROPOSALS: [
        {
            title: 'Top 10 máy lạnh bán chạy nhất năm 2024 tại Điện máy XANH',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/1571962/top-may-lanh-ban-chay-nhat-nam-tai-dien638670178611404057.jpg'
        },
        {
            title: 'Top 5 máy lạnh 2 chiều bán chạy nhất năm 2024 tại Điện Máy Xanh',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/1571950/GIA%20DUNG%20%287%29638669619671610735.jpg'
        },
        {
            title: 'Top 10 máy lọc nước RO bán chạy nhất năm 2024 tại Điện Máy Xanh',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/1572112/top-may-loc-nuoc-thumb638672667013448740.jpg'
        },
        {
            title: '10 lưu ý quan trọng khi sử dụng bếp từ bạn nhất định phải biết',
            banner: 'https://cdnv2.tgdd.vn/mwg-static/dmx/News/Thumb/640951/beptu638672610877586002.jpg'
        },
    ]
}