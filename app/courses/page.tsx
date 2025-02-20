"use client";

import { useUser } from "@clerk/nextjs";
import NavBar from "../components/nav-bar";
import CourseViewer from "../components/course-viewer";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Course {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  performance?: number;
}

interface CourseWithRecommendations extends Course {
  recommendations: string[];
}

export default function CoursesPage() {
  const { isSignedIn, user } = useUser();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseWithRecommendations[]>([]);

  useEffect(() => {
    // Example data - replace with your API call
    const dummyCourses = [
      {
        id: "1",
        name: "English Literature",
        teacher: "Ms. Smith",
        subject: "English",
        performance: 65,
        recommendations: [
          "Read Peppa Pig stories to improve basic vocabulary",
          "Try Dr. Seuss books for phonics practice",
          "Watch English cartoons with subtitles"
        ]
      },
      {
        id: "2",
        name: "Basic Mathematics",
        teacher: "Mr. Johnson",
        subject: "Mathematics",
        performance: 75,
        recommendations: [
          "Practice multiplication tables with fun games",
          "Use blocks for visual learning",
          "Try Math Blaster games"
        ]
      }
    ];
    setCourses(dummyCourses);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Main Content */}
      <div className="pt-16 px-4">
        <div className="max-w-7xl mx-auto py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Track your progress and get personalized recommendations</p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {courses.map((course) => (
              <Card key={course.id} className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                <CardHeader className="bg-blue-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-blue-900">{course.name}</CardTitle>
                      <p className="text-blue-600">{course.teacher}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(course.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View Course
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {/* Performance Indicator */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Performance</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            (course.performance || 0) >= 70 ? 'bg-green-500' :
                            (course.performance || 0) >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${course.performance}%` }}
                        />
                      </div>
                      <span className="font-medium">{course.performance}%</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Learning Recommendations</h3>
                    <ul className="space-y-2">
                      {course.recommendations.map((rec, idx) => (
                        <li 
                          key={idx}
                          className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg text-blue-900"
                        >
                          <span>📚</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Resources */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🎮</span>
                    Interactive Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Learn while having fun with educational games!</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>📚</span>
                    Story Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Explore exciting stories that help you learn!</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🎥</span>
                    Video Lessons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Watch fun educational videos!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CourseViewer Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-lg shadow-xl">
            <CourseViewer 
              selectedCourse={selectedCourse} 
              onClose={() => setSelectedCourse(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}