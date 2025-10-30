const axios = require('axios');

class JobFetcherService {
  async fetchJobDescription(jobRole, location = 'Remote') {
    // Simulated job descriptions (In production, integrate with job APIs)
    const jobDescriptions = {
      'Software Engineer': `
Full Stack Software Engineer
We are seeking a talented Full Stack Software Engineer to join our team.

Requirements:
- 3+ years experience with JavaScript/TypeScript
- Proficiency in Node.js and React
- Experience with RESTful APIs and databases (SQL/NoSQL)
- Understanding of cloud platforms (AWS/GCP/Azure)
- Strong problem-solving and communication skills

Responsibilities:
- Design and develop scalable web applications
- Collaborate with cross-functional teams
- Write clean, maintainable code
- Participate in code reviews and technical discussions
`,
      'Data Scientist': `
Data Scientist
Join our data team to drive insights and build ML models.

Requirements:
- Master's degree in Computer Science, Statistics, or related field
- 2+ years of experience in data science
- Proficiency in Python (pandas, scikit-learn, TensorFlow)
- Strong SQL and data visualization skills
- Experience with A/B testing and statistical analysis

Responsibilities:
- Develop and deploy machine learning models
- Analyze large datasets to extract insights
- Collaborate with stakeholders to define metrics
- Present findings to technical and non-technical audiences
`,
      default: `
${jobRole}
We are looking for a qualified ${jobRole} to join our team.

Requirements:
- Relevant experience in the field
- Strong technical and communication skills
- Ability to work in a team environment
- Problem-solving mindset

Responsibilities:
- Perform duties related to the role
- Collaborate with team members
- Contribute to project success
`
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      jobRole,
      location,
      description: jobDescriptions[jobRole] || jobDescriptions.default,
      source: 'Simulated'
    };
  }
}

module.exports = new JobFetcherService();