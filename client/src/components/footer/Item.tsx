import { string } from "prop-types";

const Item = ({ Links, title }: { Links: any; title: string }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link: Array) => (
        <li key={link.name}>
          <a
            className="text-gray-400 hover:text-purple-400 duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const IconMap = ({ Links }: { Links: Array }) => {
  // const array = new Array<string>();
  // const arr = string[]

  return (
    <div className=" flex flex-row place-content-around ">
      {Links.map((link: Array) => (
        <div>
          <a
            className="text-gray-400 hover:text-purple-400 duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
            key={link.key}
          >
            {link.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export { Item, IconMap };
