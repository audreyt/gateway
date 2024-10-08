# Graph Service

The Graph Service manages the social graphs, including follow/unfollow actions, blocking users, and other social interactions. It allows applications to maintain and query the social connections between users on the Frequency network.

## API Reference

[Open Full API Reference Page](https://projectlibertylabs.github.io/gateway/graph)
{{#swagger-embed ../openapi-specs/graph.openapi.json}}


## Configuration

{{#markdown-embed ../developer-docs/graph/ENVIRONMENT.md 2}}


## Best Practices

- **Data Integrity**: Ensure the integrity of social graph data by implementing robust validation checks.
- **Efficient Queries**: Optimize queries to handle large social graphs efficiently.
- **User Privacy**: Protect user privacy by ensuring that graph data is only accessible to authorized entities.
