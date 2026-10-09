const projects = [
  {
    "id": "usb-game-controller",
    "title": "Custom USB Game Controller",
    "date": "September 2026 – Present",
    "description": "A custom wired USB game controller for PC gaming, built around an RP2040 microcontroller.",
    "tech": [
      "RP2040",
      "C/C++",
      "USB HID",
      "CAD",
      "3D Printing"
    ],
    "points": [
      "Designing a custom wired USB game controller using an RP2040 microcontroller, integrating Hall-effect joysticks, analog triggers, and digital button inputs for PC gaming.",
      "Developing embedded firmware using GPIO, onboard ADC, I²C, and USB HID to process six analog input channels while prototyping a 3D-printed enclosure and internal component layout for custom electronics, wiring, and assembly."
    ]
  },
  {
    "id": "rc-car-interface",
    "title": "RC Car Control Interface",
    "role": "Frontend Developer",
    "date": "April 2026 - June 2026",
    "tech": [
      "React",
      "TypeScript",
      "Vite",
      "REST APIs"
    ],
    "points": [
      "Developed a React and TypeScript frontend for an RC car telemetry chatbot, designing an interactive interface for querying vehicle data through natural-language inputs.",
      "Worked on frontend architecture for integrating REST API communication with a Python/FastAPI backend, supporting retrieval of vehicle telemetry from a Neo4j knowledge graph."
    ]
  },
  {
    "id": "ai-face-recognition",
    "title": "AI Face Recognition App",
    "date": "January 2026 – March 2026",
    "description": "A real-time face recognition application with a Qt6 GUI and an indexed image storage layer.",
    "tech": [
      "Python",
      "Qt",
      "NumPy",
      "OpenCV",
      "MediaPipe",
      "dlib"
    ],
    "points": [
      "Built a real-time face recognition application utilizing OpenCV for image processing, MediaPipe for 478-point landmark extraction, and dlib embeddings for accurate face identification.",
      "Designed modular architecture with a Qt6 GUI and a filesystem-based image storage layer with JSON indexing.",
      "Implemented Euclidean distance similarity search across stored 128-D embeddings enabling accurate face detection."
    ]
  },
  {
    "id": "empowered-learners",
    "title": "EmpowerED Learners Platform",
    "description": "Web platform providing accessible special education resources with built-in translation.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ]
  },
  {
    "id": "personal-portfolio",
    "title": "Personal Portfolio",
    "description": "React-based personal portfolio deployed on GitHub Pages.",
    "tech": [
      "React",
      "GitHub Pages"
    ],
    "github": "https://github.com/joelrajah08/joelrajah08.github.io"
  }
];

export default projects;
