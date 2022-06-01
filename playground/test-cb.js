function callbackFunction(errors, value) {
    if (errors) {
        return errors;
    } else {
        console.log(value);
        return value;
    }
}
callbackFunction(null, './public');
// Truyền vào tham số đầu tiên là null, tham số thứ 2 là ./public, nếu chạy mà nó ra /.public là đúng