import { Search, Filter } from 'lucide-react';

function Courses() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="mt-2 text-gray-600">Explore our comprehensive DevOps courses</p>
        </div>
      </header>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          title="Docker Fundamentals"
          description="Learn the basics of containerization with Docker"
          duration="6 hours"
          level="Beginner"
          image="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=400&h=250"
        />
        <CourseCard
          title="Kubernetes Essentials"
          description="Master container orchestration with Kubernetes"
          duration="8 hours"
          level="Intermediate"
          image="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=400&h=250"
        />
        <CourseCard
          title="CI/CD Pipeline Development"
          description="Build and deploy applications automatically"
          duration="10 hours"
          level="Advanced"
          image="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400&h=250"
        />
      </div>
    </div>
  );
}

function CourseCard({ 
  title, 
  description, 
  duration, 
  level,
  image 
}: { 
  title: string; 
  description: string; 
  duration: string; 
  level: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{duration}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">{level}</span>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}

export default Courses;