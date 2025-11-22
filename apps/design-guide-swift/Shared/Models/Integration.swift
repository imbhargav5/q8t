import Foundation

// MARK: - Integration
struct Integration: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let provider: IntegrationProvider
    let providerName: String
    let providerIcon: String?
    let category: IntegrationCategory
    let accountName: String
    let accountIdentifier: String?
    let status: IntegrationStatus
    let connectedAt: Date?
    let lastSyncAt: Date?
    let tokenExpiresAt: Date?
    let permissions: [String]
    let stats: IntegrationStats?
    let errorMessage: String?
    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        provider: IntegrationProvider,
        providerName: String,
        providerIcon: String? = nil,
        category: IntegrationCategory,
        accountName: String,
        accountIdentifier: String? = nil,
        status: IntegrationStatus,
        connectedAt: Date? = nil,
        lastSyncAt: Date? = nil,
        tokenExpiresAt: Date? = nil,
        permissions: [String] = [],
        stats: IntegrationStats? = nil,
        errorMessage: String? = nil,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.provider = provider
        self.providerName = providerName
        self.providerIcon = providerIcon
        self.category = category
        self.accountName = accountName
        self.accountIdentifier = accountIdentifier
        self.status = status
        self.connectedAt = connectedAt
        self.lastSyncAt = lastSyncAt
        self.tokenExpiresAt = tokenExpiresAt
        self.permissions = permissions
        self.stats = stats
        self.errorMessage = errorMessage
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

// MARK: - Integration Stats
struct IntegrationStats: Codable {
    let apiCallsToday: Int?
    let apiCallsLimit: Int?
    let storageUsed: Int? // in bytes
    let storageLimit: Int? // in bytes
    let itemsSynced: Int?

    init(
        apiCallsToday: Int? = nil,
        apiCallsLimit: Int? = nil,
        storageUsed: Int? = nil,
        storageLimit: Int? = nil,
        itemsSynced: Int? = nil
    ) {
        self.apiCallsToday = apiCallsToday
        self.apiCallsLimit = apiCallsLimit
        self.storageUsed = storageUsed
        self.storageLimit = storageLimit
        self.itemsSynced = itemsSynced
    }
}

// MARK: - Provider Definition
struct ProviderDefinition: Codable, Identifiable {
    let id: String
    let provider: IntegrationProvider
    let name: String
    let description: String
    let category: IntegrationCategory
    let icon: String?
    let features: [String]
    let capabilities: [String]
    let isAvailable: Bool
    let documentationUrl: String?

    init(
        id: String,
        provider: IntegrationProvider,
        name: String,
        description: String,
        category: IntegrationCategory,
        icon: String? = nil,
        features: [String] = [],
        capabilities: [String] = [],
        isAvailable: Bool = true,
        documentationUrl: String? = nil
    ) {
        self.id = id
        self.provider = provider
        self.name = name
        self.description = description
        self.category = category
        self.icon = icon
        self.features = features
        self.capabilities = capabilities
        self.isAvailable = isAvailable
        self.documentationUrl = documentationUrl
    }
}
