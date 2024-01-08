import { Footer } from "../components/Footer";
import SignInOrUp from "../components/SignInOrUp";

const Root = () => {
  return (
    <div className="min-h-[100vh] lg:flex lg:flex-col">
      <SignInOrUp />
      <Footer />
    </div>
  );
};

export default Root;
