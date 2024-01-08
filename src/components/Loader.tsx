import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center">
      <TailSpin
        height="80"
        width="80"
        color="#1D9BF0"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Loader;
