import achieversImg from '../assets/projects/academic-achievers.svg'
import mtoniImg from '../assets/projects/mtoni-resort.svg'
import stanbicImg from '../assets/projects/stanbic-funding.svg'

export const projects = [
  {
    title: 'Academic Achievers — Learning Application',
    description:
      'An educational app where learners browse and study past examination papers. Built with Kotlin, MVVM, and Firebase (authentication and cloud storage), with a focus on maintainable, scalable code.',
    image: achieversImg,
    tech: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Firebase'],
    demo: '#', // TODO: live link
    github: '', // TODO: repo link
  },
  {
    title: 'Mtoni Resort Website',
    description:
      'A responsive React website for a resort — showcasing services, accommodation, and contact information with a clean, intuitive UX.',
    image: mtoniImg,
    tech: ['React.js', 'Tailwind CSS', 'Responsive Design'],
    demo: '#', // TODO: live link
    github: '', // TODO: repo link
  },
  {
    title: 'Stanbic Flexible Funding App',
    description:
      'Frontend work on a banking application supporting flexible funding workflows — form handling, validation, reusable UI components, and backend integration. Professionally described; no confidential details.',
    image: stanbicImg,
    tech: ['React.js', 'REST APIs', 'Component UI'],
    demo: '',
    github: '',
  },
]
