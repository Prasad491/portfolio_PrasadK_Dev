import { API_PATHS } from '../constants/uiStrings';

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function fetchPortfolio() {
  const response = await fetch(API_PATHS.portfolio);
  const payload = await parseJsonResponse(response);
  return payload.data;
}

export async function submitContact(body) {
  const response = await fetch(API_PATHS.contact, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return parseJsonResponse(response);
}

export async function fetchContactMessages(key) {
  const response = await fetch(`${API_PATHS.contactMessages}?key=${encodeURIComponent(key)}`);
  return parseJsonResponse(response);
}

export function getResumeDownloadUrl() {
  return API_PATHS.resume;
}
