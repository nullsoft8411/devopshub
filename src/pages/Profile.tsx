import { User, Mail, Award, Clock } from 'lucide-react';

function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">Manage your account and view your progress</p>
      </header>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="bg-gray-100 rounded-full p-4">
            <User className="h-16 w-16 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
            <div className="flex items-center mt-1 text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span>john.doe@example.com</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Achievements</h3>
            </div>
            <div className="space-y-2">
              <Achievement
                title="Docker Master"
                description="Completed all Docker courses"
                date="March 10, 2024"
              />
              <Achievement
                title="CI/CD Expert"
                description="Built 5 CI/CD pipelines"
                date="March 5, 2024"
              />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-medium">Recent Activity</h3>
            </div>
            <div className="space-y-2">
              <Activity
                title="Completed Lab"
                description="Docker Container Deployment"
                time="2 hours ago"
              />
              <Activity
                title="Started Course"
                description="Kubernetes Fundamentals"
                time="1 day ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Achievement({ 
  title, 
  description, 
  date 
}: { 
  title: string; 
  description: string; 
  date: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  );
}

function Activity({ 
  title, 
  description, 
  time 
}: { 
  title: string; 
  description: string; 
  time: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
}

export default Profile;