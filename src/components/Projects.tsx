import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Project One",
    description: "A revolutionary web application",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&h=300",
    link: "#"
  },
  {
    title: "Project Two",
    description: "Mobile app development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=300",
    link: "#"
  },
  {
    title: "Project Three",
    description: "UI/UX Design Portfolio",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=500&h=300",
    link: "#"
  }
];

export default function Projects() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          My Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a 
                  href={project.link}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Learn More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}