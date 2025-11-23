import Foundation

class MockEmails {
    // MARK: - Email Participants

    static let currentUser = EmailParticipant(
        name: "Sarah Chen",
        email: "sarah.chen@example.com"
    )

    static let johnDoe = EmailParticipant(
        name: "John Doe",
        email: "john.doe@customer.com"
    )

    static let janeSmith = EmailParticipant(
        name: "Jane Smith",
        email: "jane.smith@client.com"
    )

    static let supportTeam = EmailParticipant(
        name: "Support Team",
        email: "support@example.com"
    )

    // MARK: - Email Labels

    static let labels: [EmailLabel] = [
        EmailLabel(name: "Important", color: "red"),
        EmailLabel(name: "Customer", color: "blue"),
        EmailLabel(name: "Follow-up", color: "yellow"),
        EmailLabel(name: "Resolved", color: "green")
    ]

    // MARK: - Email Threads

    static let emailThreads: [EmailThread] = [
        // Thread 1: Support Request
        EmailThread(
            subject: "Issue with account access",
            participants: [currentUser, johnDoe],
            messageCount: 3,
            lastMessageAt: Date().addingTimeInterval(-3600),
            isStarred: true,
            hasAttachments: false,
            labels: [labels[0], labels[1]],
            messages: [
                EmailMessage(
                    from: johnDoe,
                    to: [currentUser],
                    subject: "Issue with account access",
                    body: "Hi Sarah,\n\nI've been having trouble accessing my account for the past two days. When I try to log in, I get an error message saying 'Invalid credentials' even though I'm sure my password is correct.\n\nCould you please help me resolve this?\n\nBest regards,\nJohn",
                    status: .read,
                    priority: .high,
                    sentAt: Date().addingTimeInterval(-86400),
                    attachments: []
                ),
                EmailMessage(
                    from: currentUser,
                    to: [johnDoe],
                    subject: "Re: Issue with account access",
                    body: "Hi John,\n\nThank you for reaching out. I'll look into this right away and get back to you shortly.\n\nBest,\nSarah",
                    status: .read,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-82800),
                    attachments: []
                ),
                EmailMessage(
                    from: currentUser,
                    to: [johnDoe],
                    subject: "Re: Issue with account access",
                    body: "Hi John,\n\nI've reset your account password and sent you a temporary one via SMS. Please use that to log in and then change it to something secure.\n\nLet me know if you have any other issues!\n\nBest,\nSarah",
                    status: .read,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-3600),
                    attachments: []
                )
            ]
        ),

        // Thread 2: Feature Request
        EmailThread(
            subject: "Feature request: Export functionality",
            participants: [currentUser, janeSmith],
            messageCount: 2,
            lastMessageAt: Date().addingTimeInterval(-7200),
            isStarred: false,
            hasAttachments: true,
            labels: [labels[1], labels[2]],
            messages: [
                EmailMessage(
                    from: janeSmith,
                    to: [currentUser],
                    subject: "Feature request: Export functionality",
                    body: "Hello,\n\nWe would love to see an export feature that allows us to download our data in CSV format. This would be incredibly useful for our reporting needs.\n\nI've attached a mockup of what we're thinking.\n\nThanks,\nJane",
                    status: .read,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-10800),
                    attachments: [
                        EmailAttachment(
                            name: "export-mockup.png",
                            size: 245000,
                            mimeType: "image/png",
                            url: "https://example.com/attachments/mockup.png"
                        )
                    ]
                ),
                EmailMessage(
                    from: currentUser,
                    to: [janeSmith],
                    subject: "Re: Feature request: Export functionality",
                    body: "Hi Jane,\n\nThank you for the suggestion! I've forwarded this to our product team and they're very interested. I'll keep you updated on the progress.\n\nBest,\nSarah",
                    status: .read,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-7200),
                    attachments: []
                )
            ]
        ),

        // Thread 3: General Inquiry
        EmailThread(
            subject: "Question about pricing tiers",
            participants: [currentUser, johnDoe],
            messageCount: 1,
            lastMessageAt: Date().addingTimeInterval(-14400),
            isStarred: false,
            hasAttachments: false,
            labels: [labels[1]],
            messages: [
                EmailMessage(
                    from: johnDoe,
                    to: [currentUser],
                    subject: "Question about pricing tiers",
                    body: "Hi,\n\nI'm considering upgrading to the Professional plan. Could you explain the main differences between Professional and Enterprise?\n\nThanks,\nJohn",
                    status: .unread,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-14400),
                    attachments: []
                )
            ]
        ),

        // Thread 4: Thank You
        EmailThread(
            subject: "Thank you for the excellent support!",
            participants: [currentUser, janeSmith],
            messageCount: 2,
            lastMessageAt: Date().addingTimeInterval(-43200),
            isStarred: true,
            hasAttachments: false,
            labels: [labels[3]],
            messages: [
                EmailMessage(
                    from: janeSmith,
                    to: [currentUser],
                    subject: "Thank you for the excellent support!",
                    body: "Sarah,\n\nI just wanted to say thank you for all your help over the past week. Your responsiveness and expertise have been outstanding!\n\nBest,\nJane",
                    status: .read,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-50400),
                    attachments: []
                ),
                EmailMessage(
                    from: currentUser,
                    to: [janeSmith],
                    subject: "Re: Thank you for the excellent support!",
                    body: "Hi Jane,\n\nYou're very welcome! It's always a pleasure working with you. Don't hesitate to reach out if you need anything else.\n\nBest,\nSarah",
                    status: .read,
                    priority: .normal,
                    sentAt: Date().addingTimeInterval(-43200),
                    attachments: []
                )
            ]
        )
    ]

    // MARK: - Draft Email

    static let draftEmail = EmailDraft(
        to: [johnDoe],
        cc: [],
        bcc: [],
        subject: "Follow-up on your request",
        body: "Hi John,\n\nI wanted to follow up on your recent request...\n\n",
        attachments: []
    )
}
