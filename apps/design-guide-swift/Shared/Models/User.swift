import Foundation

// MARK: - User
struct User: Codable, Identifiable {
    let id: String
    let email: String
    let name: String
    let avatar: String?

    init(id: String, email: String, name: String, avatar: String? = nil) {
        self.id = id
        self.email = email
        self.name = name
        self.avatar = avatar
    }
}

// MARK: - Workspace Member
struct WorkspaceMember: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let userId: String
    let role: WorkspaceRole
    let joinedAt: Date

    init(id: String, workspaceId: String, userId: String, role: WorkspaceRole, joinedAt: Date) {
        self.id = id
        self.workspaceId = workspaceId
        self.userId = userId
        self.role = role
        self.joinedAt = joinedAt
    }
}

// MARK: - User With Member Info
struct UserWithMemberInfo: Codable, Identifiable {
    let id: String
    let email: String
    let name: String
    let avatar: String?
    let role: WorkspaceRole
    let status: UserStatus
    let conversationLoad: Int

    init(id: String, email: String, name: String, avatar: String? = nil, role: WorkspaceRole, status: UserStatus, conversationLoad: Int) {
        self.id = id
        self.email = email
        self.name = name
        self.avatar = avatar
        self.role = role
        self.status = status
        self.conversationLoad = conversationLoad
    }
}
