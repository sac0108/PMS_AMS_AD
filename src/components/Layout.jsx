import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return <div className="flex"><Sidebar /><main className="flex-1 p-4 md:p-6"><Header />{children}</main></div>;
}
