export const downloadExcel = async (data: any[], fileName: string) => {
    // Dynamically import xlsx to avoid server-side issues (though usually fine in client components)
    const xlsx = await import("xlsx");
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, `${fileName}.xlsx`);
};
