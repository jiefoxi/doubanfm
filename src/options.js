(function (window, undefined) {
    'use strict';
    var mainview = document.getElementById('mainview');

    uiEnhance();

    function uiEnhance() {
        var elements, elem, i, len;
        //navtab
        elements = document.querySelectorAll('#navbar-container li');
        for (i = 0, len = elements.length ; i < len ; i += 1) {
            elements[i].addEventListener('click', navTab, false);
        }
        //check switch
        elements = mainview.querySelectorAll('label');
        for (i = 0, len = elements.length ; i < len ; i += 1) {
            elements[i].addEventListener('click', saveOptions, false);
        }

        restoreOptions();
    }

    function navTab() {
        if (navTab.last !== this.id) {
            document.getElementById(this.id.slice(0, -3)).style.display = 'block';
            this.className = 'selected';
            document.getElementById(navTab.last.slice(0, -3)).style.display = 'none';
            document.getElementById(navTab.last).className = '';
            navTab.last = this.id;
        }
    }
    navTab.last = 'browserPageNav';

    // Saves options to localStorage.
    function saveOptions(e) {
        var input = this.querySelector('input');
        localStorage[input.name] = input.checked ? input.value : '0';
    }

    // Restores select box state to saved value from localStorage.
    function restoreOptions() {
        var i, len, elements, elem, config;
        elements = mainview.querySelectorAll('input[type=checkbox]');
        for (i = 0, len = elements.length ; i < len ; i += 1) {
            elem = elements[i];
            elem.checked = localStorage[elem.name] === elem.value;
        }
    }

    /*chrome.extension.onRequest.addListener(function (request, sender, sendRespons) {
        if (request.cmd === 'disableConfig') {
            var input = mainview.querySelector('input[name=' + request.config + ']'), commit;
            input.disabled = true;
            commit = document.createElement('p');
            commit.appendChild(document.createTextNode('你当前的浏览器版本不支持保存历史记录功能'));
            input.parentNode.parentNode.inserBefore(commit, input.parentNode);
        }
    });*/

})(window);
