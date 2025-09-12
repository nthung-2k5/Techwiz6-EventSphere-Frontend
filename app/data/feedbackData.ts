// Sample feedback data for events
export interface Feedback {
    id: number;
    eventId: number;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    timestamp: string;
    helpful: number;
    category: 'content' | 'organization' | 'venue' | 'overall';
}

export const sampleFeedback: Feedback[] = [
    // AI & Machine Learning Workshop (Event ID: 1)
    {
        id: 1,
        eventId: 1,
        userId: "john_doe",
        userName: "John Doe",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Excellent workshop! The hands-on approach with TensorFlow was incredibly valuable. Dr. Smith explained complex concepts in an accessible way.",
        timestamp: "2024-01-16T10:30:00Z",
        helpful: 12,
        category: 'content'
    },
    {
        id: 2,
        eventId: 1,
        userId: "maria_garcia",
        userName: "Maria Garcia",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        comment: "Great content and practical examples. The venue was a bit cramped for the number of participants, but overall a fantastic learning experience.",
        timestamp: "2024-01-16T14:15:00Z",
        helpful: 8,
        category: 'venue'
    },
    {
        id: 3,
        eventId: 1,
        userId: "alex_chen",
        userName: "Alex Chen",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Perfect introduction to AI/ML. The Python exercises were well-structured and the real-world applications were inspiring.",
        timestamp: "2024-01-17T09:20:00Z",
        helpful: 15,
        category: 'content'
    },

    // Cultural Night 2024 (Event ID: 2)
    {
        id: 4,
        eventId: 2,
        userId: "sarah_wilson",
        userName: "Sarah Wilson",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Amazing cultural diversity! The performances were outstanding and the food was delicious. Great way to learn about different cultures.",
        timestamp: "2024-02-21T11:45:00Z",
        helpful: 22,
        category: 'overall'
    },
    {
        id: 5,
        eventId: 2,
        userId: "david_kim",
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        comment: "Wonderful event! The organization was smooth and the variety of cultural presentations was impressive. Could use better sound system.",
        timestamp: "2024-02-21T16:30:00Z",
        helpful: 7,
        category: 'organization'
    },
    {
        id: 6,
        eventId: 2,
        userId: "emma_taylor",
        userName: "Emma Taylor",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Loved every moment! The international food stalls were a highlight. Such a great way to celebrate our diverse community.",
        timestamp: "2024-02-22T08:15:00Z",
        helpful: 18,
        category: 'content'
    },

    // Startup Pitch Competition 2024 (Event ID: 3)
    {
        id: 7,
        eventId: 3,
        userId: "alex_chen",
        userName: "Alex Chen",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Incredible networking opportunity! The judges provided valuable feedback and the winning pitches were truly innovative.",
        timestamp: "2024-03-11T13:20:00Z",
        helpful: 14,
        category: 'content'
    },
    {
        id: 8,
        eventId: 3,
        userId: "john_doe",
        userName: "John Doe",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by11YWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        comment: "Great event for aspiring entrepreneurs. The mentorship sessions were particularly valuable. Well organized overall.",
        timestamp: "2024-03-11T17:45:00Z",
        helpful: 9,
        category: 'organization'
    },

    // Music Festival 2025 (Event ID: 5) - Future event with early feedback
    {
        id: 9,
        eventId: 5,
        userId: "sarah_wilson",
        userName: "Sarah Wilson",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Can't wait for this! The lineup looks amazing and the venue is perfect. Already registered and counting down the days!",
        timestamp: "2025-01-10T12:00:00Z",
        helpful: 25,
        category: 'overall'
    },

    // Career Fair 2025 (Event ID: 6)
    {
        id: 10,
        eventId: 6,
        userId: "david_kim",
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        comment: "Excited about the companies attending! Hope there will be good representation from tech and engineering firms.",
        timestamp: "2025-01-08T15:30:00Z",
        helpful: 11,
        category: 'content'
    },

    // Environmental Sustainability Summit (Event ID: 7)
    {
        id: 11,
        eventId: 7,
        userId: "emma_taylor",
        userName: "Emma Taylor",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "This is exactly what our campus needs! Looking forward to learning about sustainable practices and green technology.",
        timestamp: "2025-01-12T10:45:00Z",
        helpful: 16,
        category: 'content'
    },

    // International Food Festival (Event ID: 8)
    {
        id: 12,
        eventId: 8,
        userId: "maria_garcia",
        userName: "Maria Garcia",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Love food festivals! Can't wait to try authentic dishes from different countries. The cooking demos sound fantastic too.",
        timestamp: "2025-01-15T14:20:00Z",
        helpful: 19,
        category: 'overall'
    },

    // Digital Art & Design Workshop (Event ID: 9)
    {
        id: 13,
        eventId: 9,
        userId: "maria_garcia",
        userName: "Maria Garcia",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Perfect for my portfolio development! The Adobe Creative Suite training will be incredibly valuable for my art projects.",
        timestamp: "2025-01-18T11:30:00Z",
        helpful: 13,
        category: 'content'
    },

    // Mental Health Awareness Week (Event ID: 10)
    {
        id: 14,
        eventId: 10,
        userId: "sarah_wilson",
        userName: "Sarah Wilson",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Such an important topic! Really appreciate the university focusing on student wellbeing. The mindfulness sessions will be great.",
        timestamp: "2025-01-20T09:15:00Z",
        helpful: 21,
        category: 'content'
    },

    // Robotics Competition 2025 (Event ID: 11)
    {
        id: 15,
        eventId: 11,
        userId: "david_kim",
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "As an engineering student, this is a dream come true! Can't wait to apply everything I've learned in a competitive setting.",
        timestamp: "2025-01-22T16:40:00Z",
        helpful: 17,
        category: 'overall'
    },

    // Photography Exhibition & Workshop (Event ID: 12)
    {
        id: 16,
        eventId: 12,
        userId: "maria_garcia",
        userName: "Maria Garcia",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Perfect combination of exhibition and learning! Looking forward to getting feedback on my portfolio and learning new techniques.",
        timestamp: "2025-01-25T13:25:00Z",
        helpful: 12,
        category: 'content'
    },
    {
        id: 17,
        eventId: 12,
        userId: "emma_taylor",
        userName: "Emma Taylor",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 4,
        comment: "Great opportunity to improve my photography skills! The portfolio review sessions will be especially helpful.",
        timestamp: "2025-01-26T10:10:00Z",
        helpful: 8,
        category: 'organization'
    },

    // Data Science & Analytics Bootcamp (Event ID: 13)
    {
        id: 18,
        eventId: 13,
        userId: "john_doe",
        userName: "John Doe",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Exactly what I need to advance my career in AI! The combination of Python, R, and SQL training looks comprehensive.",
        timestamp: "2025-01-28T14:50:00Z",
        helpful: 20,
        category: 'content'
    },

    // Blockchain & Cryptocurrency Summit (Event ID: 14)
    {
        id: 19,
        eventId: 14,
        userId: "david_kim",
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "Blockchain technology is the future! Excited to learn from industry experts and understand the practical applications.",
        timestamp: "2025-01-30T11:35:00Z",
        helpful: 15,
        category: 'content'
    },

    // Gaming Tournament Championship (Event ID: 15)
    {
        id: 20,
        eventId: 15,
        userId: "sarah_wilson",
        userName: "Sarah Wilson",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        rating: 5,
        comment: "This is going to be epic! Love that there are multiple game categories. The networking with game developers is a huge bonus!",
        timestamp: "2025-02-01T16:20:00Z",
        helpful: 23,
        category: 'overall'
    }
];

// Helper functions for feedback management
export const getFeedbackByEventId = (eventId: number): Feedback[] => {
    return sampleFeedback.filter(feedback => feedback.eventId === eventId);
};

export const getAverageRating = (eventId: number): number => {
    const eventFeedback = getFeedbackByEventId(eventId);
    if (eventFeedback.length === 0) return 0;
    
    const totalRating = eventFeedback.reduce((sum, feedback) => sum + feedback.rating, 0);
    return Math.round((totalRating / eventFeedback.length) * 10) / 10;
};

export const getFeedbackStats = (eventId: number) => {
    const eventFeedback = getFeedbackByEventId(eventId);
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    eventFeedback.forEach(feedback => {
        ratingCounts[feedback.rating as keyof typeof ratingCounts]++;
    });
    
    return {
        totalFeedback: eventFeedback.length,
        averageRating: getAverageRating(eventId),
        ratingDistribution: ratingCounts,
        mostHelpfulFeedback: eventFeedback.sort((a, b) => b.helpful - a.helpful)[0]
    };
};
