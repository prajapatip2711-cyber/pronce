"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/data";
type Item = Pick<Product,"id"|"name"|"price"|"image"|"slug"> & { quantity:number };
type Cart = { items:Item[]; add:(p:Product)=>void; remove:(id:string)=>void; count:number; total:number };
const Context = createContext<Cart | null>(null);
export function CartProvider({children}:{children:React.ReactNode}) { const [items,setItems]=useState<Item[]>([]); useEffect(()=>{ const saved=localStorage.getItem("pronce-cart"); if(saved) setItems(JSON.parse(saved)); },[]); useEffect(()=>localStorage.setItem("pronce-cart",JSON.stringify(items)),[items]); const value=useMemo(()=>({items,add:(p:Product)=>setItems(x=>{const found=x.find(i=>i.id===p.id); return found?x.map(i=>i.id===p.id?{...i,quantity:i.quantity+1}:i):[...x,{id:p.id,name:p.name,price:p.price,image:p.image,slug:p.slug,quantity:1}]}),remove:(id:string)=>setItems(x=>x.filter(i=>i.id!==id)),count:items.reduce((n,i)=>n+i.quantity,0),total:items.reduce((n,i)=>n+i.price*i.quantity,0)}),[items]); return <Context.Provider value={value}>{children}</Context.Provider>; }
export const useCart=()=>{const value=useContext(Context); if(!value) throw new Error("CartProvider missing"); return value;};
