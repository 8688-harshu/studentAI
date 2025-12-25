export const chatWithAI = async (question, marks) => {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, marks }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to get response from AI');
        }

        return await response.json();
    } catch (error) {
        console.error('Error talking to AI:', error);
        throw error;
    }
};
