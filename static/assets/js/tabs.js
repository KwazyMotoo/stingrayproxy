let tabCount = 2; // Start tab count from 2 since home is initially loaded as tab 1

function openTab(event, tabId) {
  const tabContent = document.getElementsByClassName('tab-panel');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }

  const tabLinks = document.getElementsByClassName('tab');
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  document.getElementById(tabId).style.display = 'block';
  event.currentTarget.className += ' active';
}

function addNewTab() {
  const tabList = document.getElementById('sortable');
  const tabButton = document.createElement('button');
  const newTabId = `tab${tabCount}`;
  tabButton.className = 'tab';
  tabButton.setAttribute('onclick', `openTab(event, '${newTabId}')`);
  tabButton.innerHTML = `Tab ${tabCount} <span class="close-button" onclick="closeTab(event)"><i class="fas fa-times"></i></span>`;
  tabList.appendChild(tabButton);

  const tabPanel = document.createElement('div');
  tabPanel.className = 'tab-panel';
  tabPanel.id = newTabId;
  tabPanel.innerHTML = `
    <div class="desc left-margin">
      <form id="uv-form">
        <input id="uv-search-engine" value="" type="hidden"/> 
        <input id="uv-address" type="text" placeholder="Search Google or type an URL" class="form__input"/>
      </form>
      <div class="desc left-margin">
        <p id="uv-error"></p>
        <pre id="uv-error-code"></pre>
      </div>
    </div>
    <script src="uv/uv.bundle.js" defer></script>
    <script src="uv/uv.config.js" defer></script>
    <script src="register-sw.js" defer></script>
    <script src="search.js" defer></script>
    <script src="index.js" defer></script>
  `;
  document.querySelector('.tab-content').appendChild(tabPanel);

  tabCount++;
}

function closeTab(event) {
  const tabButton = event.target.closest('.tab');
  const tabId = tabButton.getAttribute('onclick').match(/'([^']+)'/)[1];

  const tabContent = document.getElementById(tabId);
  tabContent.parentNode.removeChild(tabContent);

  tabButton.parentNode.removeChild(tabButton);
}

// Event listener for the home tab
document.getElementById('tab1').addEventListener('click', (event) => {
  openTab(event, 'tab1');
});

// Event listener for the "Add Tab" button
document.querySelector('.add-tab-button').addEventListener('click', addNewTab);
