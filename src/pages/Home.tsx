import { ArrowRight, Terminal, Shield, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: Terminal,
      title: 'Interactive Labs',
      description: 'Practice with real-world scenarios in our secure lab environments'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Learn best practices for securing infrastructure and applications'
    },
    {
      icon: Server,
      title: 'Infrastructure Skills',
      description: 'Master modern infrastructure tools and cloud technologies'
    }
  ];

  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Master DevOps Skills with Hands-on Training
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn DevOps, Linux administration, and system administration through 
          interactive courses and real-world labs.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}