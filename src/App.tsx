import { useState } from 'react';
import { Events } from './components/Events';
import { Finance } from './components/Finance';
import { Settings } from './components/Settings';
import { 
  Calendar, 
  DollarSign, 
  Settings as SettingsIcon,
  Church
} from 'lucide-react';

const menuItems = [
  { id: 'finance', label: 'Finance', icon: DollarSign, component: Finance },
  { id: 'events', label: 'Events', icon: Calendar, component: Events },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, component: Settings },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('finance');
  
  const ActiveComponent = menuItems.find(item => item.id === activeSection)?.component || Finance;

  return (
    <div className="flex h-screen w-full">
      <aside className="w-64 border-r border-border bg-sidebar">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Church className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">Report Gereja Damai</h1>
              <p className="text-sm text-muted-foreground">Management System</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'hover:bg-sidebar-accent text-sidebar-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 text-sm text-muted-foreground">
          <p>Gereja Damai Kristus</p>
          <p>Admin Portal v1.0</p>
        </div>
      </aside>
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}