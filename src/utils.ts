interface BasicAuthorizationHeader {
  Authorization: string
}

export function getBasicAuthHeader(
  username: string,
  password: string,
): BasicAuthorizationHeader {
  const credentialsBase64 = Buffer.from(`${username}:${password}`).toString(
    'base64',
  )

  return {
    Authorization: `Basic ${credentialsBase64}`,
  }
}

export function updateName(tags: { name: string; url: string; }[], criteria: string, newName: string): void {
  tags.forEach(tag => {
    // Check if the tag meets the specified criteria
    if (tag.name === criteria || tag.url === criteria) {
      // Update the name property with the new value
      tag.name = newName;
    }
  });
}

