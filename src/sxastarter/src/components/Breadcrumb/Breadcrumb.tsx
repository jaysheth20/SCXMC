import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from 'next-localization';

const Breadcrumb = () => {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <section className="breadcrumb">
      <div className="container">
        <ul className="breadcrumb-list">
          <li>
            <Link onClick={() => router.push('/')} href={'#'}>
              <i className="icon-home"></i>
            </Link>
          </li>
          <li>{t('all-products')}</li>
        </ul>
      </div>
    </section>
  );
};

export default Breadcrumb;
