"use client"

import Statis from "@/component/Stats"
import ChooseUs from "@/component/ChooseUs"
import Banner from "@/component/Banner"
import Courses from "@/component/Courses"

export default function HomePage() {


  return (
    <div className="flex flex-col min-h-screen">
  
      {/* Hero Section */}
        <Banner></Banner>
      {/* All Courses Section */}
    {/* <CourseSection></CourseSection> */}
    <Courses></Courses>

      {/* Why Choose Us Section */}
   <ChooseUs></ChooseUs>

      {/* Stats Section */}
    <Statis></Statis>

  

    </div>
  )
}
