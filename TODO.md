# Drakkar Backend - Roadmap

## Authentication & Authorization

- [ ] **Refresh Tokens**
  - Implement refresh token generation on login
  - Create `/idm/refresh` endpoint
  - Store refresh tokens securely (hashed in DB)
  - Set appropriate TTL (e.g., 7 days)

- [ ] **Token Invalidation**
  - Implement logout endpoint to invalidate tokens
  - Token blacklist/revocation strategy
  - Handle refresh token rotation
  - Invalidate all sessions on password change

- [ ] **Rate Limiting Enhancements**
  - Add user-based rate limiting for authenticated routes
  - Implement progressive delays on failed login attempts

## Security

- [ ] **Password Reset Flow**
  - Forgot password endpoint
  - Reset token generation and validation
  - Email integration for reset links

- [ ] **Multi-Factor Authentication (MFA)**
  - TOTP support (Google Authenticator, etc.)
  - Backup codes generation

## User Management

- [ ] **Profile Management**
  - Update profile endpoint
  - Avatar upload

- [ ] **Account Deletion**
  - Soft delete vs hard delete strategy
  - Data retention policies

## Infrastructure

- [ ] **Logging & Monitoring**
  - Structured logging
  - Request tracing

- [ ] **Testing**
  - Expand unit test coverage
  - Integration tests for auth flows
