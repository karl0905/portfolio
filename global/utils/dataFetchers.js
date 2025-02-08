import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import readmeData from '@/data/readme.json';

export function getExperience() {
  return experienceData;
}

export function getProjects() {
  return projectsData;
}

export function getSkills() {
  return skillsData;
}

export function getReadme() {
  return readmeData;
}
