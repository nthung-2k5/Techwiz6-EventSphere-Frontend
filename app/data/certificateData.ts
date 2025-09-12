// Sample certificate and QR code data for events
export interface Certificate {
    id: string;
    eventId: number;
    eventTitle: string;
    participantName: string;
    participantEmail: string;
    issueDate: string;
    certificateNumber: string;
    organizerName: string;
    organizerSignature?: string;
    templateType: 'participation' | 'completion' | 'achievement' | 'workshop';
    verificationCode: string;
    isValid: boolean;
}

export interface QRCode {
    id: string;
    eventId: number;
    participantName: string;
    participantEmail: string;
    qrCodeData: string;
    generatedAt: string;
    expiresAt?: string;
    checkInStatus: 'pending' | 'checked-in' | 'expired';
    checkInTime?: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
}

// Sample certificates data
export const sampleCertificates: Certificate[] = [
    {
        id: "CERT-001-2024",
        eventId: 1,
        eventTitle: "AI & Machine Learning Workshop",
        participantName: "John Doe",
        participantEmail: "john.doe@student.university.edu",
        issueDate: "2024-01-16",
        certificateNumber: "AIML-2024-001",
        organizerName: "Dr. Smith",
        templateType: 'workshop',
        verificationCode: "VER-AIML-2024-JD001",
        isValid: true
    },
    {
        id: "CERT-002-2024",
        eventId: 1,
        eventTitle: "AI & Machine Learning Workshop",
        participantName: "Maria Garcia",
        participantEmail: "maria.garcia@student.university.edu",
        issueDate: "2024-01-16",
        certificateNumber: "AIML-2024-002",
        organizerName: "Dr. Smith",
        templateType: 'workshop',
        verificationCode: "VER-AIML-2024-MG002",
        isValid: true
    },
    {
        id: "CERT-003-2024",
        eventId: 2,
        eventTitle: "Cultural Night 2024",
        participantName: "Alex Chen",
        participantEmail: "alex.chen@student.university.edu",
        issueDate: "2024-02-21",
        certificateNumber: "CN-2024-003",
        organizerName: "Student Affairs",
        templateType: 'participation',
        verificationCode: "VER-CN-2024-AC003",
        isValid: true
    },
    {
        id: "CERT-004-2024",
        eventId: 2,
        eventTitle: "Cultural Night 2024",
        participantName: "Sarah Wilson",
        participantEmail: "sarah.wilson@student.university.edu",
        issueDate: "2024-02-21",
        certificateNumber: "CN-2024-004",
        organizerName: "Student Affairs",
        templateType: 'participation',
        verificationCode: "VER-CN-2024-SW004",
        isValid: true
    },
    {
        id: "CERT-005-2024",
        eventId: 3,
        eventTitle: "Startup Pitch Competition 2024",
        participantName: "Alex Chen",
        participantEmail: "alex.chen@student.university.edu",
        issueDate: "2024-03-11",
        certificateNumber: "SPC-2024-005",
        organizerName: "Entrepreneurship Club",
        templateType: 'achievement',
        verificationCode: "VER-SPC-2024-AC005",
        isValid: true
    },
    {
        id: "CERT-006-2024",
        eventId: 3,
        eventTitle: "Startup Pitch Competition 2024",
        participantName: "John Doe",
        participantEmail: "john.doe@student.university.edu",
        issueDate: "2024-03-11",
        certificateNumber: "SPC-2024-006",
        organizerName: "Entrepreneurship Club",
        templateType: 'participation',
        verificationCode: "VER-SPC-2024-JD006",
        isValid: true
    }
];

// Sample QR codes data
export const sampleQRCodes: QRCode[] = [
    {
        id: "QR-001-2025",
        eventId: 4,
        participantName: "John Doe",
        participantEmail: "john.doe@student.university.edu",
        qrCodeData: "EVENT:4|USER:john_doe|TOKEN:abc123def456|TIMESTAMP:2025-01-12T09:00:00Z",
        generatedAt: "2025-01-10T10:30:00Z",
        expiresAt: "2025-01-14T18:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Cybersecurity Bootcamp",
        eventDate: "2025-01-12",
        eventLocation: "IT Lab, Building C"
    },
    {
        id: "QR-002-2025",
        eventId: 5,
        participantName: "Sarah Wilson",
        participantEmail: "sarah.wilson@student.university.edu",
        qrCodeData: "EVENT:5|USER:sarah_wilson|TOKEN:xyz789ghi012|TIMESTAMP:2025-03-15T12:00:00Z",
        generatedAt: "2025-01-08T14:20:00Z",
        expiresAt: "2025-03-16T23:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Music Festival 2025",
        eventDate: "2025-03-15",
        eventLocation: "University Quad"
    },
    {
        id: "QR-003-2025",
        eventId: 6,
        participantName: "David Kim",
        participantEmail: "david.kim@student.university.edu",
        qrCodeData: "EVENT:6|USER:david_kim|TOKEN:mno345pqr678|TIMESTAMP:2025-04-10T10:00:00Z",
        generatedAt: "2025-01-09T16:45:00Z",
        expiresAt: "2025-04-10T16:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Career Fair 2025",
        eventDate: "2025-04-10",
        eventLocation: "Student Center Main Hall"
    },
    {
        id: "QR-004-2025",
        eventId: 7,
        participantName: "Emma Taylor",
        participantEmail: "emma.taylor@student.university.edu",
        qrCodeData: "EVENT:7|USER:emma_taylor|TOKEN:stu901vwx234|TIMESTAMP:2025-04-22T08:00:00Z",
        generatedAt: "2025-01-12T11:15:00Z",
        expiresAt: "2025-04-22T18:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Environmental Sustainability Summit",
        eventDate: "2025-04-22",
        eventLocation: "Environmental Science Center"
    },
    {
        id: "QR-005-2025",
        eventId: 8,
        participantName: "Maria Garcia",
        participantEmail: "maria.garcia@student.university.edu",
        qrCodeData: "EVENT:8|USER:maria_garcia|TOKEN:yza567bcd890|TIMESTAMP:2025-05-05T11:00:00Z",
        generatedAt: "2025-01-15T13:30:00Z",
        expiresAt: "2025-05-05T16:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "International Food Festival",
        eventDate: "2025-05-05",
        eventLocation: "Campus Courtyard"
    },
    {
        id: "QR-006-2025",
        eventId: 9,
        participantName: "Maria Garcia",
        participantEmail: "maria.garcia@student.university.edu",
        qrCodeData: "EVENT:9|USER:maria_garcia|TOKEN:efg123hij456|TIMESTAMP:2025-05-20T10:00:00Z",
        generatedAt: "2025-01-18T09:45:00Z",
        expiresAt: "2025-05-21T16:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Digital Art & Design Workshop",
        eventDate: "2025-05-20",
        eventLocation: "Art & Design Studio"
    },
    {
        id: "QR-007-2025",
        eventId: 10,
        participantName: "Sarah Wilson",
        participantEmail: "sarah.wilson@student.university.edu",
        qrCodeData: "EVENT:10|USER:sarah_wilson|TOKEN:klm789nop012|TIMESTAMP:2025-06-02T09:00:00Z",
        generatedAt: "2025-01-20T12:00:00Z",
        expiresAt: "2025-06-06T17:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Mental Health Awareness Week",
        eventDate: "2025-06-02",
        eventLocation: "Student Wellness Center"
    },
    {
        id: "QR-008-2025",
        eventId: 11,
        participantName: "David Kim",
        participantEmail: "david.kim@student.university.edu",
        qrCodeData: "EVENT:11|USER:david_kim|TOKEN:qrs345tuv678|TIMESTAMP:2025-06-15T09:00:00Z",
        generatedAt: "2025-01-22T15:20:00Z",
        expiresAt: "2025-06-16T18:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Robotics Competition 2025",
        eventDate: "2025-06-15",
        eventLocation: "Engineering Workshop"
    },
    {
        id: "QR-009-2025",
        eventId: 12,
        participantName: "Maria Garcia",
        participantEmail: "maria.garcia@student.university.edu",
        qrCodeData: "EVENT:12|USER:maria_garcia|TOKEN:wxy901zab234|TIMESTAMP:2025-07-01T10:00:00Z",
        generatedAt: "2025-01-25T10:30:00Z",
        expiresAt: "2025-07-03T18:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Photography Exhibition & Workshop",
        eventDate: "2025-07-01",
        eventLocation: "Art Gallery & Photography Studio"
    },
    {
        id: "QR-010-2025",
        eventId: 13,
        participantName: "John Doe",
        participantEmail: "john.doe@student.university.edu",
        qrCodeData: "EVENT:13|USER:john_doe|TOKEN:cde567fgh890|TIMESTAMP:2025-07-20T09:00:00Z",
        generatedAt: "2025-01-28T11:45:00Z",
        expiresAt: "2025-07-25T17:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Data Science & Analytics Bootcamp",
        eventDate: "2025-07-20",
        eventLocation: "Data Science Lab, Building A"
    },
    {
        id: "QR-011-2025",
        eventId: 14,
        participantName: "David Kim",
        participantEmail: "david.kim@student.university.edu",
        qrCodeData: "EVENT:14|USER:david_kim|TOKEN:ijk123lmn456|TIMESTAMP:2025-08-10T10:00:00Z",
        generatedAt: "2025-01-30T14:15:00Z",
        expiresAt: "2025-08-11T18:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Blockchain & Cryptocurrency Summit",
        eventDate: "2025-08-10",
        eventLocation: "Business School Conference Center"
    },
    {
        id: "QR-012-2025",
        eventId: 15,
        participantName: "Sarah Wilson",
        participantEmail: "sarah.wilson@student.university.edu",
        qrCodeData: "EVENT:15|USER:sarah_wilson|TOKEN:opq789rst012|TIMESTAMP:2025-09-05T12:00:00Z",
        generatedAt: "2025-02-01T16:30:00Z",
        expiresAt: "2025-09-07T22:00:00Z",
        checkInStatus: 'pending',
        eventTitle: "Gaming Tournament Championship",
        eventDate: "2025-09-05",
        eventLocation: "Gaming Arena & Student Center"
    }
];

// Helper functions for certificate and QR code management
export const getCertificatesByUserId = (userId: string): Certificate[] => {
    return sampleCertificates.filter(cert => 
        cert.participantEmail.includes(userId) || cert.participantName.toLowerCase().includes(userId.toLowerCase())
    );
};

export const getCertificatesByEventId = (eventId: number): Certificate[] => {
    return sampleCertificates.filter(cert => cert.eventId === eventId);
};

export const getQRCodesByUserId = (userId: string): QRCode[] => {
    return sampleQRCodes.filter(qr => 
        qr.participantEmail.includes(userId) || qr.participantName.toLowerCase().includes(userId.toLowerCase())
    );
};

export const getQRCodesByEventId = (eventId: number): QRCode[] => {
    return sampleQRCodes.filter(qr => qr.eventId === eventId);
};

export const generateCertificateNumber = (eventId: number, participantId: string): string => {
    const eventCode = `EVT${eventId.toString().padStart(3, '0')}`;
    const year = new Date().getFullYear();
    const participantCode = participantId.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `${eventCode}-${year}-${participantCode}${timestamp}`;
};

export const generateQRCodeData = (eventId: number, userId: string): string => {
    const token = Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toISOString();
    return `EVENT:${eventId}|USER:${userId}|TOKEN:${token}|TIMESTAMP:${timestamp}`;
};

export const validateQRCode = (qrCodeData: string): boolean => {
    const parts = qrCodeData.split('|');
    return parts.length === 4 && 
           parts[0].startsWith('EVENT:') && 
           parts[1].startsWith('USER:') && 
           parts[2].startsWith('TOKEN:') && 
           parts[3].startsWith('TIMESTAMP:');
};

export const checkInWithQRCode = (qrCodeId: string): boolean => {
    const qrCode = sampleQRCodes.find(qr => qr.id === qrCodeId);
    if (!qrCode) return false;
    
    const now = new Date();
    const expiresAt = qrCode.expiresAt ? new Date(qrCode.expiresAt) : null;
    
    if (expiresAt && now > expiresAt) {
        qrCode.checkInStatus = 'expired';
        return false;
    }
    
    qrCode.checkInStatus = 'checked-in';
    qrCode.checkInTime = now.toISOString();
    return true;
};

// Certificate templates
export const certificateTemplates = {
    participation: {
        title: "Certificate of Participation",
        description: "This is to certify that",
        achievement: "has successfully participated in",
        footer: "We acknowledge your active participation and engagement."
    },
    completion: {
        title: "Certificate of Completion",
        description: "This is to certify that",
        achievement: "has successfully completed",
        footer: "Congratulations on your dedication and successful completion."
    },
    achievement: {
        title: "Certificate of Achievement",
        description: "This is to certify that",
        achievement: "has demonstrated exceptional performance in",
        footer: "We recognize your outstanding achievement and excellence."
    },
    workshop: {
        title: "Workshop Certificate",
        description: "This is to certify that",
        achievement: "has successfully attended and completed the workshop",
        footer: "We acknowledge your commitment to continuous learning and skill development."
    }
};
