import { z } from "zod";
export const contactSchema = z.object({ name:z.string().min(2).max(80), email:z.string().email(), phone:z.string().min(10).max(16), message:z.string().min(10).max(1000) });
export const orderSchema = contactSchema.extend({ address:z.string().min(8).max(300), city:z.string().min(2).max(70), state:z.string().min(2).max(70), pinCode:z.string().regex(/^\d{6}$/), payment:z.enum(["COD","UPI","Bank Transfer"]), items:z.array(z.object({name:z.string(), quantity:z.number().int().positive(), price:z.number().positive()})).min(1) });
