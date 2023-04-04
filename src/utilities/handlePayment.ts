function loadScript(src: any) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
async function displayRazorpay(
  e: React.FormEvent<HTMLButtonElement>,
  submitHandler: () => Promise<void>
) {
  e.preventDefault();
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "rzp_test_sRg8DGSjHCXVAz",
    amount: 10000,
    currency: "INR",
    name: "LESSGO tag n trac",
    description: "Test Transaction",
    handler: async function (response: any) {
      if (response.razorpay_payment_id) {
        submitHandler();
      } else {
        alert("Payment error , Enter valid Account");
      }
    },
    prefill: {
      name: "Tanishk",
      email: "Tanishk@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Soumya Dey Corporate Office",
    },
    theme: {
      color: "#83e1fb",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

export { displayRazorpay };
