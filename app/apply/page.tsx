import ApplicationForm from './components/ApplicationForm';
import { APP_NAME } from '@/lib/constants/app';

export const metadata = {
  title: `Apply to ${APP_NAME} | Founding Style Pro Application`,
  description: 'Join the first wave of Style Pros shaping the future of on-demand styling',
};

export default function ApplyPage() {
  return <ApplicationForm />;
}
