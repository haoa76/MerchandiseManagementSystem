/**
 * 
 * @param {*} pasLen 密码长度
 * @returns 随机生成的密码
 */
const pasArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '-', '$', '%', '&', '@', '+', '!'];
const createPassword = (pasLen) => {
    let password = '';
    const pasArrLen = pasArr.length;
    for (let i = 0; i < pasLen; i++) {
        const x = Math.floor(Math.random() * pasArrLen);//随机生成下标值
        password += pasArr[x];
    }
    return password
}
 
 
 
module.exports = { createPassword }