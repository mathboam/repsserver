const https = require("https");

const makePayment = ({ email, amount, provider, phone }) => {
  const params = JSON.stringify({
    email: email,
    currency: "GHS",
    amount: amount,
    mobile_money: {
      phone: phone,
      provider: provider,
    },
  });
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/charge",
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.SECRETE_KEY,
      "Content-Type": "application/json",
    },
  };
  const req = https
    .request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
        console.log(data);
      });
      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });
  req.write(params);
  req.end();
};

module.exports = { makePayment };
