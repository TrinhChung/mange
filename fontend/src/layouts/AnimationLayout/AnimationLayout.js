import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 1,
  x: { duration: 1 },
};
const AnimationLayout = () => {
  const { pathname } = useLocation();

  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        variants={pageVariants}
        transition={pageTransition}
        exit={{ opacity: 0 }}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};
export default AnimationLayout;
