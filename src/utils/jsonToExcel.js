import XLSX from 'xlsx'
const EXCEL_EXTENSION = '.xlsx';

export default function downloadAsExcel(json, title = "Sheet", widthArray) {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(json)

    workbook.Props = {
        Title: title,
        Subject: title,
        Author: "OBED",
    };
    if (widthArray) {
        worksheet['!cols'] = widthArray
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    XLSX.writeFile(workbook, title + EXCEL_EXTENSION)
}
