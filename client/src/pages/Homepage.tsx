import useVisibility from "../hooks/visibilityHook";
import "../index.css";

const Homepage = () => {
  const [dialogVisibility, handleDialogVisiblity] = useVisibility(false);
  return (
    <div className="flex justify-items h-screen  gap-3">
      <div className="grid grid-cols-2 grid-rows-1 gap-">
        {/* <div className="p-4"> */}
        <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col justify-center items-center sm:w-3/4 gap-4">
          <div>
            <h1 className="text-3xl font-bold underline mt-auto mb-4">
              This is the homepage
            </h1>
          </div>
          <div>
            <p className="mb-4">OLIVER MENSURA EST!</p>
          </div>
          <div>
            <p className="mb-4 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
              rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
            </p>
          </div>
          <div>
            <p className="mb-4 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
              rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
            </p>
          </div>
          <div>
            <p className="mb-4 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              est excepturi ipsum iusto enim, harum, quos vitae libero quae eius
              rem qui tenetur illo. Voluptates ipsa iste nam veritatis minus?
            </p>
          </div>
          <div>
            <button
              className="bg-purple-800 hover:bg-purple-900 duration-300 py-2 px-4  sm:w-50 md:w-56 lg:w-64 font-[Poppins]
           rounded-md text-white "
            >
              Join now!
            </button>
          </div>
        </div>
        {/* </div> */}
        <div className="flex justify-center items-center sm:w-5/6">
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
