import useVisibility from "../hooks/visibilityHook";
import "../index.css";

const Homepage = () => {
  const [dialogVisibility, handleDialogVisiblity] = useVisibility(false);
  return (
    <div className="w-full h-100 gap-3">
      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        {/* <div className="p-4"> */}
        <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col justify-center">
          <h1 className="text-3xl font-bold underline mt-auto mb-4">
            This is the homepage
          </h1>
          <p className="mb-4">OLIVER MENSURA EST!</p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
            rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
          </p>
          <button className={"border-solid"}>BUTTON</button>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
            rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
            rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
            rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
          </p>
        </div>
        {/* </div> */}
        <div className="flex justify-center items-center">
          <img
            src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987265163-9XILMVT3TK4HZ5X6538M/VH_01_1080pjpg.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
