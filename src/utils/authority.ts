import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('study-mama-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production.
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('study-mama-authority', JSON.stringify(proAuthority));
  reloadAuthorized();
}

export function setToken(token: string): void {
  localStorage.setItem('sm-token', token);
  reloadAuthorized();
}

export function getToken(): string {
  const smToken = localStorage.getItem('sm-token');
  return smToken || "none";
}

export function setUserId(username: string): void {
  localStorage.setItem('sm-user-id', username);
  reloadAuthorized();
}

export function getUserId(): string | null {
  const smUserId = localStorage.getItem('sm-user-id');
  return smUserId;
}

export function setUserProfile(user: string): void {
  localStorage.setItem('sm-user-profile', user);
  reloadAuthorized();
}

export function getUserProfile(): string | null {
  const smUserProfile = localStorage.getItem('sm-user-profile');
  return smUserProfile;
}

export function resetCurrent(): void {
  localStorage.removeItem('sm-user-profile');
  localStorage.removeItem('sm-user-id');
  localStorage.removeItem('sm-token');
  localStorage.removeItem('sm-content-redirect');
}

export function setRedirect2Content(redirect: string): void {
  localStorage.setItem('sm-content-redirect', redirect);
  reloadAuthorized();
}

export function getRedirect2Content(): boolean {
  return localStorage.getItem('sm-content-redirect') === '1';
}
