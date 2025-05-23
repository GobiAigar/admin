// import { Helmet } from 'react-helmet';
import react from "react";

const PageContainer = ({ title, description, children }) => (
  <div>
    <title>{title}</title>
    <meta name="description" content={description} />

    {children}
  </div>
);

export default PageContainer;
