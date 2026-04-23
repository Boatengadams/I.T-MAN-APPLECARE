export function generateWhatsAppMessage(productData) {
return `Hello 👋,

I'm interested in purchasing a device from *IT-MAN AppleCare*.

📱 Device Details
• Product: ${productData.product}
• Model: ${productData.model}
• Storage/Specs: ${productData.spec}
• Color: ${productData.color}
• Condition: ${productData.condition}

💰 Inquiry
Kindly confirm:
• Current price
• Availability
• Warranty details
• Delivery options

🔥 Limited Stock Available
⚡ Fast Delivery Nationwide
✅ Verified & Tested Devices

I'm ready to proceed with payment.

Thank you.`;
}

export function createWhatsAppLink(message) {
const phone = "233247381219";
return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}