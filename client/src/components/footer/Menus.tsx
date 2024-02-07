import {
  BeakerIcon,
  AcademicCapIcon,
  ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";

const Products = [
  { name: "iOS App", link: "#" },
  { name: "Android App", link: "#" },
  { name: "Group Plans", link: "#" },
  { name: "How It Works", link: "#" },
];
const Company = [
  { name: "Contact us", link: "#" },
  { name: "About us", link: "/about" },
  { name: "Press", link: "#" },
  { name: "Blog", link: "#" },
  { name: "News", link: "#" },
];
const Community = [
  { name: "Community Guidelines", link: "#" },
  { name: "Hall of Heroes", link: "#" },
  { name: "Contributing to Habitica", link: "#" },
  { name: "Translate Habitica", link: "#" },
];
const Support = [
  { name: "FAQ", link: "#" },
  { name: "Report a Bug", link: "#" },
  { name: "Request a Feature", link: "#" },
  { name: "Wiki", link: "#" },
];
const Developers = [
  { name: "API", link: "#" },
  { name: "Data", link: "#" },
  { name: "Add-ons & Extensions", link: "#" },
];
const RandomIcons = [
  { key: "a", name: <BeakerIcon className="w-6 h-6" />, link: "#" },
  { key: "s", name: <AcademicCapIcon className="w-6 h-6" />, link: "#" },
  { key: "d", name: <ArchiveBoxIcon className="w-6 h-6" />, link: "#" },
  {
    key: "f",
    name: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
    link: "#",
  },
  { key: "g", name: <CloudIcon className="w-6 h-6" />, link: "#" },
];
export { Products, Company, Support, Community, Developers, RandomIcons };
