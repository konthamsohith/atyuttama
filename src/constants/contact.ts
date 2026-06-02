import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";

export const CONTACT_CARDS = [
    {
        title: "Phone Number",
        value: "+91 93474 37761",
        icon: PhoneIcon
    },
    {
        title: "Our Location",
        value: "Hyderabad, India",
        icon: MapPinIcon
    },
    {
        title: "Email Address",
        value: "hello@atyuttama.com",
        icon: MailIcon
    }
] as const;
