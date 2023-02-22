import { NextSeo, NextSeoProps } from 'next-seo';
import { defaultSeoConfig } from './default.config';

const SEO: React.FC<NextSeoProps> = ({
  title = defaultSeoConfig.title,
  description = defaultSeoConfig.description,
  ...rest
}) => {
  return <NextSeo title={title} description={description} {...rest} />;
};

export default SEO;
