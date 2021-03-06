import { AccessToken, OktaAuth } from '@okta/okta-auth-js';

const authClient = new OktaAuth({
    issuer: 'https://dev-6393967.okta.com/oauth2/default', // use your own
    clientId: '0oa3ymt80xmpyOQcD5d6', // use your own
    redirectUri: window.location.origin + '/callback',
    pkce: true
});

const isAuthenticated = async () => {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await authClient.tokenManager.get('accessToken'));
};

const signIn = async (username: string, password: string) => {
    const authResult = await authClient.signIn({
        username,
        password,
        scopes: ['openid', 'email', 'profile'],
    });

    if (authResult.status === 'SUCCESS') {
        authClient.token.getWithRedirect({
            sessionToken: authResult.sessionToken,
            responseType: 'id_token',
        });
    }
};

const signOut = () => authClient.signOut();

const handleAuthentication = async () => {
    if (authClient.token.isLoginRedirect()) {
        try {
            const tokenResponse = await authClient.token.parseFromUrl();
            const {accessToken, idToken} = tokenResponse.tokens;
            if (!accessToken || !idToken) return false;

            authClient.tokenManager.add('accessToken', accessToken);
            authClient.tokenManager.add('idToken', idToken);
            return true;
        } catch (err) {
            console.warn(`authClient.token.parseFromUrl() errored: ${err}`);
            return false;
        }
    }
    return false;
};

const getAccessToken = async () => {
    const token = (await authClient.tokenManager.get(
        'accessToken'
    )) as AccessToken;

    return token;
};

export {
    isAuthenticated,
    signIn,
    signOut,
    handleAuthentication,
    getAccessToken,
};