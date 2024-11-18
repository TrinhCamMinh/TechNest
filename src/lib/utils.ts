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


const CURRENCY_FORMATTER = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
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