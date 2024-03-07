let colors = ["merah", "kuning", "hijau", "pink", "ungu"];
let clothes = ["baju", "celana", "topi", "jaket", "sepatu"];
let discounts = ["Diskon", "Sale", "Diskon", "Sale", "Sale"];

let additionalColor = "maroon";
if (!colors.includes(additionalColor)) {
    colors.push(additionalColor);
}

let result = [];

for (let i = 0; i < colors.length; i++) {
    let item = `${clothes[i % clothes.length]} ${colors[i]} ${discounts[i % discounts.length]}`;
    result.push(item);
}

console.log(result);
