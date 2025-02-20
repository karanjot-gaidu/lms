"use client"
import { useUser } from "@clerk/nextjs"
import "./home.css"
import NavBar from "./components/nav-bar"
import Search from "./components/search"
import { useState, useEffect } from "react"
import CourseViewer from "./components/course-viewer"

// Type definitions
interface Course {
  id: string;
  name: string;
  teacher: string;
  subject: string;
}

export default function ClassroomPage() {
  const { isSignedIn, user } = useUser();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  useEffect(() => {
    const initializeUser = async () => {
      if (isSignedIn && user?.id) {
        try {
          // Check if the user already exists in the database
          const userExists = await fetch(`/api/user-details?user_id=${user.id}`, {
            method: 'GET',
          });
          const data = await userExists.json();
          if (!data) {
            // Create user and their courses through the API
            await fetch('/api/user-details', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: user.id }),
            });
          }
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
    };
    initializeUser();
  }, [isSignedIn, user?.id]); 

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/classroom-bg.jpg')" }}></div>
      <NavBar />
        
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center min-h-screen relative z-10">
            <h1 className="text-2xl font-semibold text-white text-center mb-4 relative top-20">
              {isSignedIn ? `Welcome to your classroom, ${user?.fullName}!` : "Welcome to ClassroomAI!"}
            </h1>
            <div className="absolute top-[300px] left-[100px]">
              <Search setSelectedCourse={setSelectedCourse} />
            </div>
            
            {/* Course Grid Display Component would go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 px-6">
              {/* Course cards would be mapped here */}
            </div>

            {selectedCourse && (
              <div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[65%] h-[85%] bg-gray-200 rounded-lg shadow-lg z-50">
                  <CourseViewer 
                    selectedCourse={selectedCourse} 
                    onClose={() => setSelectedCourse(null)} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}