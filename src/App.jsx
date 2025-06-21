import { useState } from 'react';
import './App.css';

// Import your components here
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TaskManager from '@/components/TaskManager';
import { Card } from '@/components/ui/card';
import ApiData from './api/ApiData';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="flex gap-4 mb-6 ">
          <Button 
            variant={activeTab === 'tasks' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('tasks')}
          >
            Task Manager
          </Button>
          <Button 
            variant={activeTab === 'api' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('api')}
          >
            API Data
          </Button>
        </div>

        {activeTab === 'tasks' && (
          <Card className="mb-8">
            <TaskManager />
          </Card>
        )}
        
        {activeTab === 'api' && (
          <Card>
            <ApiData />
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
export default App; 