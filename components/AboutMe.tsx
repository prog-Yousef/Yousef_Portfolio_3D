import React from "react";
import Card3D from "./ui/Card3D"; // Assuming Card3D is in the ui folder
import { FaUserCircle } from "react-icons/fa"; // Example icon

const AboutMe = () => {
  // Sample content - replace with actual data or props
  const name = "Yousef Shahidi";
  const title = "Full Stack Developer / UI/UX Designer";
  const location = "Your Preferred Location"; // Replace
  const introduction = `
    Hello! I\'m Yousef, a passionate ${title} with a knack for creating dynamic, 
    user-friendly web applications and visually appealing interfaces. 
    With over 3 years of experience in the field, I\'ve honed my skills in 
    JavaScript, React, Node.js, and have a keen interest in exploring the
    frontiers of 3D web experiences and interactive design. I thrive on
    transforming complex ideas into elegant and efficient digital solutions.
  `;
  // You can add an avatar image URL here
  const avatarUrl = ""; // e.g., "/images/avatar.jpg" - place in public/images

  return (
    <section id="about" className="py-20 w-full">
      <h1 className="heading mb-12">
        A Little <span className="text-purple">About Me</span>
      </h1>

      <div className="flex justify-center items-center">
        <Card3D className="w-full max-w-3xl"> {/* Adjust max-width as needed */}
          <div className="flex flex-col md:flex-row items-center gap-8 p-4">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={`${name}\'s avatar`}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-xl"
              />
            ) : (
              <FaUserCircle className="text-7xl md:text-9xl text-purple" /> // Placeholder icon
            )}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{name}</h2>
              <h3 className="text-xl text-purple mb-3">{title}</h3>
              <p className="text-md text-gray-300 mb-4">
                {introduction}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Location:</strong> {location}
              </p>
              {/* You can add more details like email, links etc. here */}
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
};

export default AboutMe; 