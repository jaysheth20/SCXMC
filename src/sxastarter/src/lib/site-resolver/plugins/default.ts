import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';

import { SiteResolverPlugin } from '..';

import config from 'temp/config';

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add default/configured site
    sites.unshift({
      name: config.sitecoreSiteName,
      language: config.defaultLanguage,
      hostName: '*',
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
