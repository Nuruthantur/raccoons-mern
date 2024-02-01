import "../index.css";

const Homepage = () => {
  return (
    <div className="w-full h-100 gap-3">
      <div className="grid grid-cols-2 grid-rows-1 gap-4 ">
        <div className="p-4">
          <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex column justify-center">
            <h1 className="text-3xl font-bold underline mt-auto mb-4">
              This is the homepage
            </h1>
            <p className="mb-4">
              Welcome to my App! You may or may not be able to write some todo
              lists here in the future!
            </p>
            <p className="mb-4">
              Here is going to be some description of my App. So far this is
              empty. .............
            </p>
            <button className={"border-solid"}>BUTTON</button>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="text-white">some picture</h1>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
