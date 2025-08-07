
// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '86592609513-u273th3megs96ebb28fg6d9ar93jn6mk.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCSHvJLg0eFOFoeAzXWudNgRF_z9sWlE3Y';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://docs.googleapis.com/$discovery/rest?version=v1';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/documents.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load",gapiLoaded())
document.getElementById("gis").addEventListener("load",gapiLoaded())

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        await printDocTitle();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

async function printDocTitle() {
    try {
        const response = await gapi.client.docs.documents.get({
            documentId: '11_UQ_JHfBDjzaGeHgU4l2DxadsLvx7gN72BQtw9J-nk/edit?gid=0#gid=0',
            range: "forms!A:E",
        });
        const doc = response.result;
        const output = `Document ${doc.title} successfully found.\n`;
        document.getElementById('content').innerText = output;
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
}



