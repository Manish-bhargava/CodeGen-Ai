import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon....</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist now But yet to come.
      </p>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ABout Us</h2>
        <p className="text-gray-600 mb-4">
          Hi, I'm Manish bhargava, a full stack developer with experience in mern stack . Here's a quick overview of my work:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Wireframe-to-Code Project</h3>
            <p className="text-gray-600">
              This project allows users to convert wireframes into code using AI. It includes features like:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>AI-powered code generation</li>
              <li>User authentication</li>
              <li>Dashboard for managing wireframes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
            <p className="text-gray-600">
              - React, Next.js, Tailwind CSS<br />
              - Node.js, Express, PostgreSQL<br />
              - AI/ML integration (e.g., OpenAI API)
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}