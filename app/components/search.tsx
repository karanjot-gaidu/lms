'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

interface SearchProps {
  setSelectedCourse: (courseId: string | null) => void;
}

interface Course {
  id: string;
  name: string;
  teacher: string;
  subject: string;
}

export default function Search({ setSelectedCourse }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchCourses = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/courses/search?term=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching courses:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCourses, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="w-96">
      <Input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white/90 backdrop-blur-sm"
      />
      
      {searchResults.length > 0 && (
        <Card className="mt-2 max-h-60 overflow-y-auto">
          <CardContent className="p-2">
            {searchResults.map((course) => (
              <div
                key={course.id}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => setSelectedCourse(course.id)}
              >
                <div className="font-medium">{course.name}</div>
                <div className="text-sm text-gray-500">{course.teacher}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {isLoading && (
        <div className="mt-2 text-center text-gray-500">
          Searching...
        </div>
      )}
    </div>
  );
}