const IconMap = ({ Links }: { Links: any }) => {
  return (
    <div className="flex flex-row">
      {Links.map((link) => (
        <a
          className="text-gray-400 hover:text-purple-400 duration-300
          text-sm cursor-pointer leading-6"
          href={link.link}
          key={link.key}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export { IconMap };
