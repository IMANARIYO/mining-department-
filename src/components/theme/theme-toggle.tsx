// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useSidebar } from "@/components/ui/sidebar";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [dropDirection, setDropDirection] = React.useState("down");
//   const { state: isCollapsed } = useSidebar();
//   const dropdownRef = React.useRef<HTMLDivElement>(null);
//   const buttonRef = React.useRef<HTMLButtonElement>(null);

//   // Determine dropdown direction based on available space
//   React.useEffect(() => {
//     if (!buttonRef.current) return;

//     const handlePositioning = () => {
//       const buttonPosition = buttonRef.current?.getBoundingClientRect();
//       if (!buttonPosition) return;

//       const spaceBelow = window.innerHeight - buttonPosition.bottom;
//       const spaceAbove = buttonPosition.top;

//       // If there's more space above than below, or if there's not enough space below
//       if (spaceAbove > spaceBelow || spaceBelow < 120) {
//         setDropDirection("up");
//       } else {
//         setDropDirection("down");
//       }
//     };

//     handlePositioning();
//     window.addEventListener("resize", handlePositioning);
//     return () => window.removeEventListener("resize", handlePositioning);
//   }, []);

//   // Close dropdown when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className={`relative ${
//         isCollapsed === "expanded" ? "flex items-center gap-2" : ""
//       }`}
//     >
//       <button
//         ref={buttonRef}
//         onClick={() => setIsOpen(!isOpen)}
//         className={`h-10 w-10 rounded-md border border-input bg-background p-2 flex items-center justify-center
//           ${
//             isCollapsed === "expanded"
//               ? "bg-[#e6dfd2] text-[#5c4731] hover:bg-[#d9cebc]"
//               : "bg-[#e6dfd2]"
//           }`}
//         aria-label="Toggle theme"
//       >
//         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#5c4731]" />
//         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#5c4731]" />
//       </button>

//       {isCollapsed === "expanded" && (
//         <span className="text-[#5c4731]">Theme</span>
//       )}

//       {isOpen && (
//         <div
//           ref={dropdownRef}
//           className={`absolute ${
//             dropDirection === "up" ? "bottom-12" : "top-12"
//           } ${
//             isCollapsed === "expanded" ? "left-0" : "right-0"
//           } w-36 rounded-md border border-border bg-[#ece5d8] shadow-md z-10`}
//         >
//           <div className="py-1">
//             <button
//               onClick={() => {
//                 setTheme("light");
//                 setIsOpen(false);
//               }}
//               className="block px-4 py-2 text-sm w-full text-left hover:bg-[#e6dfd2] text-[#5c4731]"
//             >
//               Light
//             </button>
//             <button
//               onClick={() => {
//                 setTheme("dark");
//                 setIsOpen(false);
//               }}
//               className="block px-4 py-2 text-sm w-full text-left hover:bg-[#e6dfd2] text-[#5c4731]"
//             >
//               Dark
//             </button>
//             <button
//               onClick={() => {
//                 setTheme("system");
//                 setIsOpen(false);
//               }}
//               className="block px-4 py-2 text-sm w-full text-left hover:bg-[#e6dfd2] text-[#5c4731]"
//             >
//               System
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
