export const money = (amount: number) => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(amount);
export const whatsapp = (message: string) => `https://wa.me/918780491557?text=${encodeURIComponent(message)}`;
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pronce.vercel.app";
