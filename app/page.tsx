import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  HomeIcon,
  User,
  Settings,
  Info,
  GraduationCap,
  LogOut 
} from 'lucide-react';

export default function RootPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-bold text-blue-600">EduLearn</span>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          <NavItem icon={<HomeIcon className="h-5 w-5" />} label="Home" active />
          <NavItem icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
          <NavItem icon={<User className="h-5 w-5" />} label="Profile" />
          <NavItem icon={<BookOpen className="h-5 w-5" />} label="My Courses" />
          <NavItem icon={<GraduationCap className="h-5 w-5" />} label="Career Path" />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" />
          <NavItem icon={<Info className="h-5 w-5" />} label="About" />
          
          {/* Logout at bottom */}
          <div className="absolute bottom-4 w-56">
            <NavItem icon={<LogOut className="h-5 w-5" />} label="Logout" />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center px-8">
          <h1 className="text-xl font-semibold">Welcome back, Student!</h1>
        </header>

        {/* Main Content Area */}
        <main className="p-8">
          {/* Featured Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Course Cards */}
              <FeaturedCourseCard 
                title="Web Development Fundamentals"
                description="Learn the basics of web development"
                progress={75}
              />
              <FeaturedCourseCard 
                title="Data Science Essentials"
                description="Master the foundations of data science"
                progress={30}
              />
              <FeaturedCourseCard 
                title="UI/UX Design"
                description="Create beautiful user interfaces"
                progress={45}
              />
            </div>
          </section>

          {/* Learning Path Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Learning Path</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Full Stack Development</h3>
                <span className="text-blue-600">4/10 completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, label, active = false }) => {
  return (
    <div className={`
      flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer
      ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
    `}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
};

// Featured Course Card Component
const FeaturedCourseCard = ({ title, description, progress }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 rounded-lg mb-4">
        <img 
          src="/api/placeholder/400/200" 
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};