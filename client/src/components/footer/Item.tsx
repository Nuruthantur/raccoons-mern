// import { string } from "prop-types";

const Item = ({ Links, title }: { Links: any; title: string }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold" key={title}>
        {title}
      </h1>
      {Links.map((link: any) => (
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

const IconMap = ({ Links }: { Links: any }) => {
  // const array = new Array<string>();
  // const arr = string[]

  return (
    <div className=" flex flex-row justify-center gap-2.5">
      {/* place-content-around */}
      {Links.map((link: any) => (
        <div key={link.key}>
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
