const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
};

const calculatePointsFromVoucher = (voucherValue, pointsPercentage) => {
    const pointsEarned = voucherValue * (pointsPercentage / 100);
    return pointsEarned;
};

// api for checkout voucher
app.post('/checkout', (req, res) => {
    try {
        // const { use_voucher } = req.body; <<< can dynamically change from client
        const use_voucher = true;

        const originalPrice = 5000000; // <<< can dynamically change from client

        const voucherDiscountPercentage = 50; // <<< can dynamically change from client

        const discountedPrice = calculateDiscountedPrice(originalPrice, voucherDiscountPercentage);

        if (use_voucher) {
            const pointsPercentage = 2;
            const pointsEarned = calculatePointsFromVoucher(discountedPrice, pointsPercentage);

            const response = {
                original_price: originalPrice,
                discounted_price: discountedPrice,
                use_voucher: use_voucher,
                points_earned: pointsEarned,
            };

            res.status(200).json(response);
        } else {
            const response = {
                original_price: originalPrice,
                discounted_price: discountedPrice,
                use_voucher: use_voucher,
                points_earned: 0,
            };

            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
