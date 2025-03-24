export interface Contacts {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
    createdAt: string;
    status: 'read' | 'unread';
}

export interface ToastStyle {
    duration: number;
    position: 'top-right';
    style: {
        background: string;
        color: string;
        borderRadius: string;
    };
    icon?: string;
}

// Contact Card Props

export interface ContactCardProps {
    message: Contacts;
    onViewMessage: (message: Contacts) => void;
    repliedMessages: Set<string>;
}

// Reply Modal Props

export interface ReplyModalProps {
    isOpen: boolean;
    selectedMessage: Contacts | null;
    replyMessage: string;
    isSending: boolean;
    onReplyChange: (value: string) => void;
    onClose: () => void;
    onSend: () => void;
}

// View Message Modal Props

export interface ViewMessageModalProps {
    selectedMessage: Contacts | null;
    repliedMessages: Set<string>;
    onClose: () => void;
    onReply: () => void;
}