function getArrayFromSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var range = sheet.getRange("B3:B9"); // Lấy dữ liệu
    var values = range.getValues().flat(); // Lấy giá trị và làm phẳng mảng

    var jsonArray = JSON.stringify(values, null, 2);
    Logger.log(jsonArray); // In ra log để kiểm tra

    return jsonArray;
}

// hàm này để đưa vào scripts gg sheet