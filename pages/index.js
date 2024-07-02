import { useState } from 'react';

export default function Component() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: event.target.name.value,
      words: event.target.words.value,
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Words saved successfully!');
        event.target.reset();
      } else {
        alert('Error saving words. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving words. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md m-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Share Your Words</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* ... (rest of the form remains the same) ... */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Words'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
