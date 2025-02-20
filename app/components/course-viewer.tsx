'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X } from 'lucide-react';

interface CourseViewerProps {
  selectedCourse: string;
  onClose: () => void;
}

interface CourseDetail {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  description: string;
  assignments: Array<{
    id: string;
    title: string;
    dueDate: string;
    status: string;
  }>;
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
  }>;
}

export default function CourseViewer({ selectedCourse, onClose }: CourseViewerProps) {
  const [courseData, setCourseData] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('announcements');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/courses/${selectedCourse}`);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [selectedCourse]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading course details...
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-full">
        Course not found
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">{courseData.name}</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
          <X size={24} />
        </button>
      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'announcements' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          Announcements
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'assignments' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            {courseData.announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <div className="text-sm text-gray-500">{announcement.date}</div>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {courseData.assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <div className="text-sm text-gray-500">Due: {assignment.dueDate}</div>
                </CardHeader>
                <CardContent>
                  <div className={`inline-block px-2 py-1 rounded ${
                    assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {assignment.status}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}