export class ResponseError extends Error {
  constructor({message, errorType, errorCode, data} = {}) {
    super(message);
    this.name = 'ResponseError';
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.data = data;
  }
}

export async function fetchData(uri, options) {
  try {
    const response = await fetch(uri, options);
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const data = isJson ? await response.json() : undefined;

    // HTTP error occured (4xx - 5xx)
    if (!response.ok) {
      // Server error (5xx)
      if (500 <= response.status && response.status <= 599) {
        throw new ResponseError({
          message: 'Encountered server-error response (5xx)',
          errorType: 'server-error',
          errorCode: response.status,
        });
      }
      // Client error (4xx)
      else {
        throw new ResponseError({
          message: 'Encountered client-error response (4xx)',
          errorType: 'client-error',
          errorCode: response.status,
          data: data,
        });
      }
    }

    // Successful request
    return data;
  }
  catch (e) {
    // Network error occured
    if (e instanceof TypeError) {
      throw new ResponseError({
        message: 'Encountered network error',
        errorType: 'network-error',
      });
    }
    else {
      throw e;
    }
  }
}

// Check if error type is client-error
export function isClientError(e) {
  if (e instanceof ResponseError && e.errorType === 'client-error') {
    return true;
  }
  return false;
}

// Get errors which are specific to form field(s)
export function getFieldErrors(e) {
  if (hasFieldErrors(e)) {
    const errors = [];
    e.data.detail.forEach(errorDetail => {
      const field = errorDetail.loc[1];
      const msg = errorDetail.msg;
      errors.push({field, msg});
    });
    return errors;
  }
  return [];
}

// Get generic error (not specific to any form field)
export function getGenericError(e) {
  if (hasGenericError(e)) {
    return e.data.detail;
  }
  return null;
}

// Check if error is specific to form field(s)
function hasFieldErrors(e) {
  if ((e instanceof ResponseError && e.data) && Array.isArray(e.data.detail)) {
    return true;
  }
  return false;
}

// Check if error is generic (not specific to any form field)
function hasGenericError(e) {
  if (e instanceof ResponseError && e.data) {
    return true;
  }
  return false;
}
