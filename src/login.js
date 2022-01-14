import jQuery from "jquery";

const loginSuccessEvent = new Event("login-success");

function login(successCallback) {
  identityWindow = window.open(
    "https://identity.deso.org/log-in?accessLevelRequest=3",
    null,
    "toolbar=no, width=800, height=1000, top=0, left=0"
  );
  window.addEventListener("login-success", successCallback);
}

function handleInit(e) {
  if (!init) {
    init = true;
    iframe = document.getElementById("identity");

    for (const e of pendingRequests) {
      postMessage(e);
    }

    pendingRequests = [];
  }
  respond(e.source, e.data.id, {});
}

function handleLogin(payload) {
  if (identityWindow) {
    identityWindow.close();
    identityWindow = null;
    if (payload && !jQuery.isEmptyObject({ payload })) {
      if (payload.publicKeyAdded) {
        console.log("public key added" + payload.publicKeyAdded);
        // store payload in local storage
        localStorage.setItem("lastLoggedInUser", payload.publicKeyAdded);
        localStorage.setItem("IdentityUsers", JSON.stringify(payload.users));
        window.dispatchEvent(loginSuccessEvent);
      }
    }
  }
}

function respond(e, t, n) {
  e.postMessage(
    {
      id: t,
      service: "identity",
      payload: n,
    },
    "*"
  );
}

function postMessage(e) {
  init
    ? this.iframe.contentWindow.postMessage(e, "*")
    : pendingRequests.push(e);
}

window.addEventListener("message", (message) => {
  const {
    data: { id: id, method: method, payload: payload },
  } = message;
  if (method == "initialize") {
    handleInit(message);
  } else if (method == "login") {
    handleLogin(payload);
  }
});

var init = false;
var iframe = null;
var pendingRequests = [];
var identityWindow = null;

export default login;
