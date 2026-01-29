# Contributing to Drakkar

Thank you for your interest in contributing! This project is licensed under the Business Source License 1.1 (BSL 1.1), which means the source code is publicly available but has certain usage restrictions.

## How to Contribute

### Reporting Issues

- Search existing issues before creating a new one
- Use a clear, descriptive title
- Include steps to reproduce, expected behavior, and actual behavior
- Add relevant labels if possible

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests and linting
5. Commit with clear, descriptive messages
6. Push to your fork and open a PR

### Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

### Code Style

- Follow the existing code style (ESLint configuration is provided)
- Write meaningful commit messages
- Add tests for new functionality
- Update documentation as needed

### Pull Request Guidelines

- Keep PRs focused and small when possible
- Reference related issues in the PR description
- Ensure all tests pass before requesting review
- Be responsive to feedback

## License Note

By contributing, you agree that your contributions will be licensed under the same BSL 1.1 license that covers the project.

## Questions?

Open an issue for any questions about contributing.
