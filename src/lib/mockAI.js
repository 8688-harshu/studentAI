export const generateMockResponse = (query, marks) => {
    const intro = `Based on your query "${query}", here is the ${marks}-mark answer from the syllabus:`;

    if (marks === 2) {
        return `${intro}\n\n**Definition:**\n${query} is a fundamental concept in the subject referring to specific properties or functions within the system.\n\n**Key Point:**\nIt is primarily used to ensure data integrity and process efficiency in small-scale operations.`;
    }

    if (marks === 5) {
        return `${intro}\n\n**Definition:**\n${query} is a mechanism that facilitates the interaction between distinct components, ensuring seamless data flow and operational stability.\n\n**Key Characteristics:**\n1. **Efficiency:** Optimizes resource usage.\n2. **Scalability:** Adapts to growing input sizes.\n3. **Reliability:** Ensures consistent outputs under varying conditions.\n\n**Example:**\nConsider a library system where "${query}" acts as the cataloging agent, organizing books by genre to speed up retrieval times.`;
    }

    if (marks === 10) {
        return `${intro}\n\n**1. Introduction**\n${query} is a comprehensive framework used extensively in advanced systems. It serves as the backbone for establishing protocols and maintaining architectural integrity across distributed networks.\n\n**2. Detailed Explanation**\nThe concept operates on three modules:\n- **Input Module:** Captures raw data streams.\n- **Processing Unit:** Applies transformation logic.\n- **Output Interface:** Delivers structured results.\n\nThis modular approach allows for high maintainability and testing isolation.\n\n**3. Advantages**\n- **Robustness:** Handles exceptions gracefully.\n- **Security:** Implements inherent validation layers.\n- **Performance:** Reduces latency through parallel processing.\n\n**4. Real-world Application**\nIn banking software, ${query} is utilized to validate transaction integrity, ensuring that concurrent operations do not result in race conditions.\n\n**5. Conclusion**\nIn summary, ${query} is critical for modern system design, balancing performance with strict adherence to safety protocols.`;
    }

    return "Please select a valid marks category (2, 5, or 10).";
};
