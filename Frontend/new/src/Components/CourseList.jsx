
import React from 'react';
import CourseCard from './CourseCard';
import { fullCourseData } from '../data/fullCourseData';

const CourseList = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Premium Courses</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Expert-led courses designed to help you master new skills and advance your career.
                    Start your learning journey today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {fullCourseData.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default CourseList;
