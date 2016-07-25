﻿define(['dialogHelper', 'paper-icon-button-light', 'emby-input', 'emby-select'], function (dialogHelper) {

    return {
        show: function (person) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'components/metadataeditor/personeditor.template.html', true);

                xhr.onload = function (e) {

                    var template = this.response;
                    var dlg = dialogHelper.createDialog({
                        removeOnClose: true,
                        size: 'medium'
                    });

                    dlg.classList.add('ui-body-b');
                    dlg.classList.add('background-theme-b');

                    dlg.classList.add('formDialog');

                    var html = '';
                    var submitted = false;

                    html += Globalize.translateDocument(template);

                    dlg.innerHTML = html;
                    document.body.appendChild(dlg);

                    dlg.querySelector('.txtPersonName', dlg).value = person.Name || '';
                    dlg.querySelector('.selectPersonType', dlg).value = person.Type || '';
                    dlg.querySelector('.txtPersonRole', dlg).value = person.Role || '';

                    dialogHelper.open(dlg);

                    dlg.addEventListener('close', function () {

                        if (submitted) {
                            resolve(person);
                        } else {
                            reject();
                        }
                    });

                    dlg.querySelector('.btnCancel').addEventListener('click', function (e) {

                        dialogHelper.close(dlg);
                    });

                    dlg.querySelector('form').addEventListener('submit', function (e) {

                        submitted = true;

                        person.Name = dlg.querySelector('.txtPersonName', dlg).value;
                        person.Type = dlg.querySelector('.selectPersonType', dlg).value;
                        person.Role = dlg.querySelector('.txtPersonRole', dlg).value || null;

                        dialogHelper.close(dlg);

                        e.preventDefault();
                        return false;
                    });
                }

                xhr.send();
            });
        }
    };
});