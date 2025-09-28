const form = document.querySelector("#url-form");
const protocol = document.querySelector("#protocol");
const hostname = document.querySelector("#hostname");
const port = document.querySelector("#port");
const pathname = document.querySelector("#pathname");
const search = document.querySelector("#search");
const hash = document.querySelector("#hash");
const btnNavigate = document.querySelector("#btn-navigate");
const btnReplace = document.querySelector("#btn-replace");
const btnReload = document.querySelector("#btn-reload");

function getValueForm() {
  const protocolValue = protocol.value;
  const hostnameValue = hostname.value;
  const portValue = port.value.trim();
  const pathnameValue = pathname.value.trim();
  const searchValue = search.value.trim();
  const hashValue = hash.value.trim();
  return {
    protocolValue,
    hostnameValue,
    portValue,
    pathnameValue,
    searchValue,
    hashValue,
  };
}

function buildURLForm() {
  const formValue = getValueForm();
  const {
    protocolValue,
    hostnameValue,
    portValue,
    pathnameValue,
    searchValue,
    hashValue,
  } = formValue;

  if (!hostnameValue.trim()) {
    return;
  }

  let urlNew = `${protocolValue}//${hostnameValue.trim()}`;

  if (portValue && !isNaN(portValue)) {
    urlNew += ":" + portValue.trim();
  }

  if (pathnameValue) {
    urlNew += pathnameValue.startsWith("/")
      ? pathnameValue
      : "/" + pathnameValue;
  }

  if (searchValue) {
    urlNew += searchValue.startsWith("?") ? searchValue : "?" + searchValue;
  }

  if (hashValue) {
    urlNew += hashValue.startsWith("#") ? hashValue : "#" + hashValue;
  }

  return urlNew;
}

function navigateToNewURL() {
  const urlNew = buildURLForm();
  if (urlNew) {
    window.location.assign(urlNew);
  }
}

function replaceNewURL() {
  const urlNew = buildURLForm();
  if (urlNew) {
    window.location.replace(urlNew);
  }
}

function reloadURL() {
  window.location.reload();
}

btnNavigate.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToNewURL();
});

btnReplace.addEventListener("click", (event) => {
  event.preventDefault();
  replaceNewURL();
});

btnReload.addEventListener("click", (event) => {
  event.preventDefault();
  reloadURL();
});
