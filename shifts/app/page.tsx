//import Calendar from "@/app/ui/calendar"; // placed here temporarily to test
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
  return (
    <div className="p-8">
      <h3 className="font-bold">Error</h3>
      <p>Page should have redirected to calendar display.</p>
    </div>
  );
}