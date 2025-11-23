import Foundation

// MARK: - Email Enums

enum EmailStatus: String, Codable {
    case unread = "unread"
    case read = "read"
    case archived = "archived"

    var displayName: String {
        switch self {
        case .unread: return "Unread"
        case .read: return "Read"
        case .archived: return "Archived"
        }
    }
}

enum EmailPriority: String, Codable {
    case low = "low"
    case normal = "normal"
    case high = "high"

    var displayName: String {
        switch self {
        case .low: return "Low"
        case .normal: return "Normal"
        case .high: return "High"
        }
    }
}

// MARK: - Email Models

struct EmailThread: Codable, Identifiable {
    let id: String
    let subject: String
    let participants: [EmailParticipant]
    let messageCount: Int
    let lastMessageAt: Date
    let isStarred: Bool
    let hasAttachments: Bool
    let labels: [EmailLabel]
    let messages: [EmailMessage]

    init(id: String = UUID().uuidString, subject: String, participants: [EmailParticipant], messageCount: Int, lastMessageAt: Date, isStarred: Bool, hasAttachments: Bool, labels: [EmailLabel], messages: [EmailMessage]) {
        self.id = id
        self.subject = subject
        self.participants = participants
        self.messageCount = messageCount
        self.lastMessageAt = lastMessageAt
        self.isStarred = isStarred
        self.hasAttachments = hasAttachments
        self.labels = labels
        self.messages = messages
    }
}

struct EmailMessage: Codable, Identifiable {
    let id: String
    let from: EmailParticipant
    let to: [EmailParticipant]
    let cc: [EmailParticipant]?
    let bcc: [EmailParticipant]?
    let subject: String
    let body: String
    let htmlBody: String?
    let status: EmailStatus
    let priority: EmailPriority
    let sentAt: Date
    let attachments: [EmailAttachment]

    init(id: String = UUID().uuidString, from: EmailParticipant, to: [EmailParticipant], cc: [EmailParticipant]? = nil, bcc: [EmailParticipant]? = nil, subject: String, body: String, htmlBody: String? = nil, status: EmailStatus, priority: EmailPriority, sentAt: Date, attachments: [EmailAttachment] = []) {
        self.id = id
        self.from = from
        self.to = to
        self.cc = cc
        self.bcc = bcc
        self.subject = subject
        self.body = body
        self.htmlBody = htmlBody
        self.status = status
        self.priority = priority
        self.sentAt = sentAt
        self.attachments = attachments
    }
}

struct EmailParticipant: Codable, Identifiable {
    let id: String
    let name: String
    let email: String

    init(id: String = UUID().uuidString, name: String, email: String) {
        self.id = id
        self.name = name
        self.email = email
    }
}

struct EmailAttachment: Codable, Identifiable {
    let id: String
    let name: String
    let size: Int // in bytes
    let mimeType: String
    let url: String

    init(id: String = UUID().uuidString, name: String, size: Int, mimeType: String, url: String) {
        self.id = id
        self.name = name
        self.size = size
        self.mimeType = mimeType
        self.url = url
    }

    var formattedSize: String {
        let formatter = ByteCountFormatter()
        formatter.allowedUnits = [.useKB, .useMB]
        formatter.countStyle = .file
        return formatter.string(fromByteCount: Int64(size))
    }
}

struct EmailLabel: Codable, Identifiable {
    let id: String
    let name: String
    let color: String

    init(id: String = UUID().uuidString, name: String, color: String) {
        self.id = id
        self.name = name
        self.color = color
    }
}

struct EmailDraft: Codable {
    var to: [EmailParticipant]
    var cc: [EmailParticipant]
    var bcc: [EmailParticipant]
    var subject: String
    var body: String
    var attachments: [EmailAttachment]

    init(to: [EmailParticipant] = [], cc: [EmailParticipant] = [], bcc: [EmailParticipant] = [], subject: String = "", body: String = "", attachments: [EmailAttachment] = []) {
        self.to = to
        self.cc = cc
        self.bcc = bcc
        self.subject = subject
        self.body = body
        self.attachments = attachments
    }
}
