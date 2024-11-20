// Suggested code may be subject to a license. Learn more: ~LicenseLog:653705595.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from 'nanoid';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PRODUCT_TYPE } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const autoGenerateRandomID = (size: number) => {
  //* Numbers and english alphabet without lookalikes: 1, l, I, 0, O, o, u, v, 5, S, s, 2, Z.
  //* Complete set: 346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz
  const randomVocabSet = '1234567890abcdef';

  //* Params: alphabet: string, defaultSize?: number
  const nanoid = customAlphabet(randomVocabSet, size || 10);
  return nanoid(size);
};

export const exportToCSV = (csvData: any, fileName: string) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}

export const ObjectGroupBy = (array: Array<any>, groupField: string) => {
  const result = array.reduce((acc, item) => {
    if (acc.hasOwnProperty(item[groupField])) {
      acc[item[groupField]] = [...acc[item[groupField]], item];
      return acc;
    }
    acc[item[groupField]] = [item];
    return acc;
  }, {});
  return result;
};


const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};

export const returnProductImagePath = (productType: string) => {
  const TelImagePath: string = '/src/assets/google-tv-aqua-qled-4k-65-inch-aqt65s800ux-thumb-638645971165423373-550x340.jpg';
  const LapImagePath: string = '/src/assets/macbook-air-m1-2020-gray-600x600.jpg';
  const MobImagePath: string = '/src/assets/iphone-16-pro-max-black-thumb-600x600.jpg';
  const KeyboardImagePath: string = '/src/assets/bo-ban-phim-chuot-khong-day-logitech-mk240-thumb-2-600x600.jpg';

  switch (productType) {
    case PRODUCT_TYPE.KEYBOARD:
      return KeyboardImagePath;
    case PRODUCT_TYPE.MOBILE_PHONE:
      return MobImagePath;
    case PRODUCT_TYPE.LAPTOP:
      return LapImagePath;
    case PRODUCT_TYPE.TELEVISION:
      return TelImagePath;
    default:
      break;
  }
  return '';
}

export const returnProductCarouselImagePath = (productType: string): string[] => {
  const KeyboardCarouselImagePath = [
    '/src/assets/carousel/keyboard/ban-phim-bluetooth-asus-marshmallow-kw100-xanh-600x600.jpg',
    '/src/assets/carousel/keyboard/ban-phim-bluetooth-logitech-k380s-hong-thumb-600x600.jpg',
    '/src/assets/carousel/keyboard/ban-phim-khong-day-bluetooth-rapoo-e9050g-thumb-1-600x600.jpg',
    '/src/assets/carousel/keyboard/ban-phim-tablet-xiaomi-redmi-pad-pro-130624-045150-600x600.jpg',
    '/src/assets/carousel/keyboard/magic-keyboard-cho-ipad-pro-m4-11-inch-600x600.jpg',
  ]

  const LaptopCarouselImagePath = [
    '/src/assets/carousel/laptop/dell-inspiron-15-3520-i5-n5i5052w1-thumb-600x600.jpg',
    '/src/assets/carousel/laptop/hp-elitebook-x360-830-g11-ultra-7-a7rc0pt-thumb-638661786769276175-600x600.jpg',
    '/src/assets/carousel/laptop/macbook-pro-16-inch-m4-max-128gb-1tb-011124-122551-761-600x600.jpg',
    '/src/assets/carousel/laptop/msi-katana-a15-ai-b8vg-r9-466vn-thumb-600x600.jpg',
    '/src/assets/carousel/laptop/msi-stealth-18-mercedes-amg-a1vhg-ultra-9-080vn-thumb-600x600.jpg',
  ]

  const MobileCarouselImagePath = [
    '/src/assets/carousel/mobile/iphone-16-blue-600x600.png',
    '/src/assets/carousel/mobile/iphone-16-pro-titan-sa-mac.png',
    '/src/assets/carousel/mobile/oppo-reno12-f-4g-green-thumb-600x600.jpg',
    '/src/assets/carousel/mobile/samsung-galaxy-z-fold6-xam-thumbn-600x600.jpg',
    '/src/assets/carousel/mobile/xiaomi-14t-grey-thumb-600x600.jpg',
  ]

  const TelCarouselImagePath = [
    '/src/assets/carousel/television/google-tivi-tcl-qd-mini-led-4k-98c755-thumb-550x340.jpg',
    '/src/assets/carousel/television/google-tv-qd-mini-led-tcl-4k-115-inch-115x955-thumb-550x340 (1).jpg',
    '/src/assets/carousel/television/google-tv-qd-mini-led-tcl-4k-115-inch-115x955-thumb-550x340.jpg',
    '/src/assets/carousel/television/samsung-micro-led-4k-mna110ms1a-thumb-638647844786324959-550x340.jpg',
    '/src/assets/carousel/television/smart-tivi-qned-lg-4k-98-inch-98qned89tsa-thumb-550x340.jpg',
  ]

  switch (productType) {
    case PRODUCT_TYPE.KEYBOARD:
      return KeyboardCarouselImagePath;
    case PRODUCT_TYPE.MOBILE_PHONE:
      return MobileCarouselImagePath;
    case PRODUCT_TYPE.LAPTOP:
      return LaptopCarouselImagePath;
    case PRODUCT_TYPE.TELEVISION:
      return TelCarouselImagePath;
    default:
      break;
  }
  return [];
}