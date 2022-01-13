const getError = async (response) => {
  const { message } = await response.json() || {} // TODO Handle backend response Error

  return new Error(message || response.status.toString())
}

export const parseResponse = async (response) => {
  if (!response.ok) {
    throw await getError(response)
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }

  return new Promise((resolve) => resolve(response))
}

export const toBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)

  bytes.forEach((_, index) => {
    binary += String.fromCharCode(bytes[index])
  })

  return btoa(binary)
}

export const parseFileResponse = async (response) => {
  if (!response.ok) {
    throw await getError(response)
  }

  const fileContentType = response.headers.get('file-content-type') || 'image/jpeg'
  const responseArrayBuffer = await response.arrayBuffer()
  const resource = `data:${fileContentType};base64,${toBase64(responseArrayBuffer)}`
  return new Promise((resolve) => resolve(resource))
}
