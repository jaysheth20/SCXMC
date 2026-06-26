// 'use client';

// import React from 'react';
// import { Text, Image as SitecoreImage, TextField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
// import HeroBannerItem from './HeroBannerItem';

// interface HeroBannerItemFields {
//   id: string;
//   fields: {
//     Title?: TextField;
//     Image?: ImageField;
//   };
// }

// interface HeroBannerFields {
//   Title?: TextField;
//   Image?: ImageField;
//   MultiList?: HeroBannerItemFields[];
// }

// interface HeroBannerParams {
//   styles?: string;
// }

// interface HeroBannerProps {
//   fields?: HeroBannerFields;
//   params?: HeroBannerParams;
// }

// export default function HeroBanner({ fields, params }: HeroBannerProps): JSX.Element {
//   const title = fields?.Title;
//   const image = fields?.Image;
//   const multiList = fields?.MultiList || [];

//   console.log('HeroBanner fields:', fields);

//   return (
//     <section className={`hero-banner ${params?.styles || ''}`}>
//       <div className="container">
//         {title?.value && (
//           <h1 className="hero-title">
//             <Text field={title} />
//           </h1>
//         )}

//         {image?.value && (
//           <div className="hero-image">
//             <SitecoreImage field={image} alt={image?.value?.alt || ''} />
//           </div>
//         )}

//         {multiList.length > 0 && (
//           <div className="hero-items grid gap-6 md:grid-cols-2">
//             {multiList.map((item) => (
//               <HeroBannerItem key={item.id} fields={item.fields} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
'use client';

import React from 'react';
import { Text, Image as SitecoreImage } from '@sitecore-jss/sitecore-jss-nextjs';
   
interface HeroBannerItemFields {
  id: string;
  fields: {
    Title?: { value?: string };
    Image?: { value?: { src?: string; alt?: string } };
  };
}

interface HeroBannerFields {
  Title?: { value?: string };
  Image?: { value?: { src?: string; alt?: string } };
  MultiList?: HeroBannerItemFields[];
}

interface HeroBannerParams {
  styles?: string;
}

interface HeroBannerProps {
  fields?: HeroBannerFields;
  params?: HeroBannerParams;
  rendering?: unknown; // 👈 Sitecore rendering metadata (variant info here)

}

export default function HeroBanner({ fields, params, rendering }: HeroBannerProps): JSX.Element {
  const title = fields?.Title;
  const image = fields?.Image;
  console.log('HeroBanner rendering metadata:', rendering); // 👈 Logs variant info

  console.log('HeroBanner fields:', fields);

  return (
    <section className={`hero-banner ${params?.styles || ''}`}>
      <div className="container">
        {title?.value && (
          <h1 className="hero-title">
            <Text field={title} />
          </h1>
        )}

        {image?.value && (
          <div className="hero-image">
            <SitecoreImage field={image} alt={image?.value?.alt || ''} />
          </div>
        )}

        {/* {multiList.length > 0 && (
          <div className="hero-items grid gap-6 md:grid-cols-2">
            {multiList.map((item) => (
              <HeroBannerItem key={item.id} fields={item.fields} />
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
}
