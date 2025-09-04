'use client';

import { RichText, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export default function HeroBannerItem() {
  const { sitecoreContext } = useSitecoreContext();

  const heading = sitecoreContext?.rendering?.fields?.Heading;
  const subHeading = sitecoreContext?.rendering?.fields?.SubHeading;

  return (
    <div className="hero-banner-item text-center py-8 px-4 bg-gray-100 rounded-lg shadow-md">
      {/* Debug */}
      {process.env.NODE_ENV === 'development' && (
        <pre className="text-xs bg-gray-200 p-2 rounded mb-2">
          {JSON.stringify(sitecoreContext, null, 2)}
        </pre>
      )}

      {heading?.value && (
        <div className="text-3xl font-bold text-gray-900 mb-2">
          <RichText field={heading} />
        </div>
      )}

      {subHeading?.value && (
        <p className="text-lg text-gray-600">
          <Text field={subHeading} />
        </p>
      )}
    </div>
  );
}
