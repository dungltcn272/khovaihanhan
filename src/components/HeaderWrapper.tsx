import Header from '@/components/Header';
import { getContactInfo } from '@/lib/firebaseService';

export default async function HeaderWrapper() {
  const contactInfo = await getContactInfo();
  const avatarUrl = contactInfo?.avatarUrl || '';

  return <Header avatarUrl={avatarUrl} />;
}
