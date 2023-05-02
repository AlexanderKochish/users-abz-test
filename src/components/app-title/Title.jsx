import title from "../../assets/Rectangle.jpg";

const Title = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${title})`,
        backgroundSize: "cover",
        width: "100%",
        height: "600px",
      }}
    >
      <div className="grid place-items-center w-full h-full">
        <div className="flex flex-col justify-center items-center p-2 sm:w-96 min-h-96 text-center text-white">
          <h2 className="font-semibold text-4xl mt-8 sm:mt-0 sm:text-5xl mb-6">
            Test assignment for 
            front-end developer
          </h2>
          <p className="text-lg">
            What defines a good front-end developer is one that
            has skilled knowledge of HTML, CSS, JS with a vast
            understanding of User design thinking as they'll be
            building web interfaces with accessibility in mind.
            They should also be excited to learn, as the world
            of Front-End Development keeps evolving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Title;
