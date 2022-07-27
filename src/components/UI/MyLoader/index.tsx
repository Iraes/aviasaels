import ContentLoader from "react-content-loader";

import s from "./MyLoader.module.scss";

const MyLoader = (props?: any) => (
  <ContentLoader
    className={s.loader}
    speed={2}
    width={550}
    height={30}
    viewBox="0 0 550 30"
    backgroundColor="#2196f3"
    foregroundColor="#2900f5"
    {...props}
  >
    <rect x="20" y="10" rx="10" ry="10" width="500" height="10" />
  </ContentLoader>
);

export default MyLoader;
