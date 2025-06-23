import { redirect } from 'next/navigation';

export default function UserDashboard() {
  // After login/register success, redirect to articles list (as per requirements)
  redirect('/user/articles');
}
