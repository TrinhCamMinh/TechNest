import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from 'nanoid';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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

