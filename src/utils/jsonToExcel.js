import XLSX from 'xlsx'
const EXCEL_EXTENSION = '.xlsx';

export default function downloadAsExcel(json,title= "Sheet") {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(json)

    workbook.Props = {
        Title: title,
        Subject:  title,
        Author: "OBED",
    };

    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    XLSX.writeFile(workbook,title+EXCEL_EXTENSION)
}
