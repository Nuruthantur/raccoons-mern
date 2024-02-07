import { BeakerIcon } from "@heroicons/react/24/solid";

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
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-6 h-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />
</svg>;

const RandomIcons = [
  { name: <BeakerIcon className="w-6 h-6" />, link: "#" },
  { name: <BeakerIcon className="w-6 h-6" />, link: "#" },
  { name: <BeakerIcon className="w-6 h-6" />, link: "#" },
  { name: <BeakerIcon className="w-6 h-6" />, link: "#" },
  { name: <BeakerIcon className="w-6 h-6" />, link: "#" },
];
export { Products, Company, Support, Community, Developers, RandomIcons };
