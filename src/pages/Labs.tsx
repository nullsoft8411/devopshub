import { Search, Filter, Terminal } from 'lucide-react';

function Labs() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interactive Labs</h1>
          <p className="mt-2 text-gray-600">Practice your skills in real-world scenarios</p>
        </div>
      </header>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search labs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LabCard
          title="Deploy a Web Application"
          description="Deploy a React application using Docker and Nginx"
          duration="45 minutes"
          difficulty="Intermediate"
          category="Docker"
        />
        <LabCard
          title="Set Up CI/CD Pipeline"
          description="Create a complete CI/CD pipeline using Jenkins"
          duration="60 minutes"
          difficulty="Advanced"
          category="CI/CD"
        />
        <LabCard
          title="Kubernetes Cluster Setup"
          description="Set up and configure a basic Kubernetes cluster"
          duration="90 minutes"
          difficulty="Advanced"
          category="Kubernetes"
        />
      </div>
    </div>
  );
}

function LabCard({ 
  title, 
  description, 
  duration, 
  difficulty,
  category 
}: { 
  title: string; 
  description: string; 
  duration: string; 
  difficulty: string;
  category: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <Terminal className="h-8 w-8 text-blue-500" />
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{duration}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{difficulty}</span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Start Lab
        </button>
      </div>
    </div>
  );
}

export default Labs;