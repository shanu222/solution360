import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    id: "instagram",
    href: "https://www.instagram.com/resilience_technologies_labs?igsh=MTMxM243ODBwbGFlNQ%3D%3D&utm_source=qr",
    label: "Visit our Instagram",
    icon: FaInstagram,
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/profile.php?id=61562995509964",
    label: "Visit our Facebook",
    icon: FaFacebookF,
  },
];

function SocialIcons({
  orientation = "row",
  iconSize = "md",
  className = "",
}) {
  const directionClass = orientation === "column" ? "flex-col" : "flex-row";
  const sizeClass = iconSize === "sm" ? "h-9 w-9 text-[15px]" : "h-10 w-10 text-base";

  return (
    <div className={`flex items-center gap-2 ${directionClass} ${className}`}>
      {socialLinks.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex items-center justify-center rounded-full border border-slate-900/10 text-slate-600 transition-colors duration-300 hover:border-brand-500 hover:bg-brand-500 hover:text-white dark:border-white/15 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:bg-brand-500 ${sizeClass}`}
          >
            <Icon />
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialIcons;
