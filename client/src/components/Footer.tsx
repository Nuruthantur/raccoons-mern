import React from "react";

// function Footer() {
//   return (
//     <div>
//       <div className="px-8 py-11 bg-white rounded-3xl">
//         <div className="flex flex-wrap justify-center sm:justify-around -m-2">
//           <div className="w-full sm:w-auto p-2">
//             <a>Text</a>
//           </div>
//           <div className="w-full sm:w-auto p-2">
//             <a>Text</a>
//           </div>
//           <div className="w-full sm:w-auto p-2">
//             <a>Text</a>
//           </div>
//           <div className="w-full sm:w-auto p-2">
//             <a>Text</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Footer;

const Footer = ({ color }: { color: any }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-1 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-2 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Profile
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i> Settings
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i> Options
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Footer color="pink" />;
    </>
  );
}
