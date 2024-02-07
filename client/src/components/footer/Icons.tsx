import { RandomIcons } from "./Menus";
import Item from "./Item";

const SomeIcons = ({ Icons }: { Icons: any }) => {
  //   return (
  //     <div className="text-teal-500">
  //       { Icons.map((i) => (
  //         <span
  //           key={i.name}
  //           className="p-2 cursor-pointer inline-flex items-center
  //         rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
  //         duration-300 "
  //         >
  //           <div name={i.name}></div>
  //         </span>
  //       ))}
  //     </div>
  //   );
  // };

  if (Array.isArray(Icons)) {
    return;
    <div className="text-teal-500">
      {Icons.map((i) => (
        <span
          key={i.name}
          className="p-2 cursor-pointer inline-flex items-center
          rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-purple-500
          duration-300 "
        >
          <div name={i.name}></div>
        </span>
      ))}
    </div>;
  } else {
    return;
    <div>
      <h1>hello</h1>
    </div>;
  }
};

const IconsContainer = () => {
  return (
    <div>
      <Item Links={RandomIcons} title="Community" />
    </div>
  );
};

export { IconsContainer, SomeIcons };
