import { FiMessageCircle } from "react-icons/fi"; import { whatsapp } from "@/lib/utils";
export function WhatsAppButton(){return <a href={whatsapp("Hi Prince, I'm interested in a product.")} target="_blank" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-xl text-black shadow-lg"><FiMessageCircle/></a>}
