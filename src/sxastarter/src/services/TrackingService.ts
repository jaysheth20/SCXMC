import { trackingApi } from '@sitecore-jss/sitecore-jss-nextjs';

import { SecureHost } from 'lib/setting';
import { dataFetcher } from 'lib/data-fetcher';
import config from 'temp/config';

const trackingApiOptions = {
  host: SecureHost,
  querystringParams: {
    sc_apikey: config.sitecoreApiKey,
  },
  fetcher: dataFetcher,
};
export const submitPageView = (pageId: any, pageUrl: any) => {
  if (!pageId || !pageUrl) return;

  trackingApi
    .trackEvent(
      [
        {
          pageId: pageId,
          url: pageUrl,
        },
      ],
      trackingApiOptions
    )
    .catch((error) => console.log(error));
};
export const trackSearchEvent = (searchTerm: any) => {
  trackingApi
    .trackEvent([{ eventId: 'Search', terms: searchTerm }], trackingApiOptions)
    .catch((error) => console.log(error));
};
export const submitGoal = (goalId: any) => {
  if (!goalId) return;
  trackingApi
    .trackEvent([{ goalId: goalId }], trackingApiOptions)
    .catch((error) => console.log(error));
};
export const abandonSession = () => {
  const abandonOptions = {
    action: 'flush',
    ...trackingApiOptions,
  };
  trackingApi.trackEvent([], abandonOptions).catch((error) => console.log(error));
};
export const submitEvent = (eventId: any) => {
  if (!eventId) return;

  trackingApi
    .trackEvent([{ eventId: eventId }], trackingApiOptions)
    .catch((error) => console.log(error));
};
