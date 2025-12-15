import ApplicationForm from './components/ApplicationForm';
import { APP_NAME } from '@/lib/constants/app';

export const metadata = {
  title: `Apply to ${APP_NAME} | Founding Stylist Application`,
  description: 'Join the first wave of stylists shaping the future of on-demand styling',
};

export default function ApplyPage() {
  return <ApplicationForm />;
}
