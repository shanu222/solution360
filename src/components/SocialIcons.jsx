import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    id: "instagram",
    href: "https://www.instagram.com/sustainablesolution360/",
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
            rel="noreferrer"
            aria-label={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)] dark:border-white/15 dark:bg-slate-900/65 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-200 ${sizeClass}`}
          >
            <Icon />
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialIcons;
