/* global common, userManagementFactory */
"use strict";

var userManagement = function ($) {
    var invalidFormatEmail = $("#invalidFormatEmail");
    var domElements = {
        searchBtn: $("form.filter .js-btnSearch"),
        syncBtn: $(".js-btnSync"),
        formFilter: $("form.filter"),
        tblUsers: $("#js-listUsers"),
        template: $(".js-template"),
        itemperpageOption: $(".js-pagination .js-itemperpageOption"),
        searchTextbox: $("form.filter input[name=user]")
    };
    var classElementsInUserTable = {
        fullName: ".js-FullName",
        nickName: ".js-NickName",
        nickNameBK: ".js-NickName_bk",
        employeeId: ".js-EmployeeId",
        extension: ".js-Extentsion",
        phone: ".js-Phone",
        email: ".js-Email",
        emailBK: ".js-Email_bk",
        skype: ".js-Skype",
        userId: ".js-UserId",
        roleId: ".js-RoleId",
        departmentId: ".js-DepartmentId",
        sectionId: ".js-SectionId",
        groupId: ".js-UserGroup",
        categoryId: ".js-CategoryId",
        locationCode: ".js-LocationCode",
        pickup: ".js-Pickup",
        address: ".js-Address",
        level: ".js-Level",
        isSecondAccount: ".js-IsSecondAccount",
        language: ".js-Language  languages ms-offscreen"
    };
    var templateElements = {
        roles: domElements.template.find(".js-divRoles"),
        sections: domElements.template.find(".js-divSection"),
        departments: domElements.template.find(".js-divDepartment"),
        categories: domElements.template.find(".js-divCategory"),
        locationCodes: domElements.template.find(".js-divLocationCode"),
        pickups: domElements.template.find(".js-divPickup"),
        levels: domElements.template.find(".js-divLevel"),
        userGroups: domElements.template.find(".js-divUserGroup"),
        isSecondAccount: domElements.template.find(".js-divIsSecondAccount"),
    };

    function onPageChanging(pageNumber) {
        domElements.formFilter.find("#PageIndex").val(pageNumber);
        renderUsersTable();
    }

    function initPagination(result) {
        if (result.TotalItem > 0) {
            $(".js-pagination").show();
            var from = (result.CurrentPage - 1) * result.ItemsPerPage + 1,
                to = from + (result.Users.length - 1);

            $(".js-pagination .detailtext")
                .text("Showing " + from + " to " + to + " of " + result.TotalItem + " entries");

            $(".js-pagination #numberlist").pagination({
                items: result.TotalItem,
                itemsOnPage: result.ItemsPerPage,
                currentPage: result.CurrentPage,
                displayedPages: 3,
                prevText: '<i class="icon mdi mdi-chevron-left"></i>',
                nextText: '<i class="icon mdi mdi-chevron-right"></i>',
                ellipsePageSet: false,
                onPageClick: function (pageNumber) {
                    onPageChanging(pageNumber);
                }
            });
        } else {
            $(".js-pagination").hide();
        }
    }

    var arrayUsers = [];

    var responseUser = {};

    function checkPermissionUser(permission, curSection, userSection) {
        var temp = null;
        if (userSection) {
            temp = userSection;
        }
        return permission.UserManagementAllSections.IsHost ||
            permission.UserManagementOwnSection.IsHost &&
            permission.UserManagementAllSections.IsRead &&
            curSection === temp ||
            permission.UserManagementOwnSection.IsHost && !permission.UserManagementAllSections.IsRead;
    }

    function generateLanguageColumn(user, permission, curSection, userSection) {
        var text = "";

        if (checkPermissionUser(permission, curSection, userSection)) {
            var languageIdsArr = languageIds.split(",");
            var languageTextsArr = languageTexts.split(",");
            var options = "";
            for (var i = 0; i < languageIdsArr.length; i++) {
                var langId = languageIdsArr[i];
                if (user.LanguageId && user.LanguageId.length && user.LanguageId.indexOf(langId) > -1) {
                    options += '<option value="' + langId + '" selected>' + languageTextsArr[i] + "</option>";
                } else {
                    options += '<option value="' + langId + '">' + languageTextsArr[i] + "</option>";
                }
            }

            var languageTemplate = [
                '<div><div class="language-content" ',
                'id =\"uId_',
                user.UserId,
                '">',
                ' <select class="js-Language browser-default languages" multiple="multiple" data-select-all="false" data-position="auto" data-container=".container">',
                options,
                " </select>",
                "</p></div></div>"
            ];
            arrayUsers.push({ divId: "uId_" + user.UserId });

            text = $(languageTemplate.join("")).html();
        } else {
            text = user.Languages;
        }

        return text;
    }

    function generateRoleColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.roles.clone();
            var selectedOption = template.find('option[value="' + user.RoleId + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            text = user.RoleName;
        }

        return text;
    }

    function generateSectionColumn(user, permission, curSection, userSection) {
        var text = "";
        if (permission.UserManagementAllSections.IsHost) {
            var template = templateElements.sections.clone();
            var selectedOption = template.find('option[value="' + user.SectionId + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            text = user.SectionName;
        }

        return text;
    }

    function generateDepartmentColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.departments.clone();
            var selectedOption = template.find('option[value="' + user.DepartmentId + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            text = user.DepartmentName;
        }

        return text;
    }

    function generateUserGroupColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.userGroups.clone();
            var selectedOption = template.find('option[value="' + user.GroupId + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            text = user.GroupName;
        }

        return text;
    }

    function generateCategoryColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.categories.clone();

            var selectedOption = template.find('option[value="' + user.CategoryId + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            text = user.CategoryName;
        }

        return text;
    }

    function generateLocationColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.locationCodes.clone();
            var selectedOption = template.find('option[value="' + user.LocationCode + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            var locationCode = user.LocationCode == null ? "" : "  " + user.LocationCode;
            text = '<a class="flag-item" href="#!">' +
                '<i class="flag-icon flag-icon-' +
                user.FlagCode +
                '"></i>' +
                "</a>" +
                locationCode;
        }

        return text;
    }

    function generatePickupColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.pickups.clone();
            var selectedOption = template.find('option[value="' + user.Pickup + '"]');

            if (selectedOption.length > 0) {
                selectedOption.attr("selected", "selected");
            } else {
                template.find('option[value=""]').attr("selected", "selected");
            }

            text = template.html();
        } else {
            text = user.Pickup === true ? "Yes" : user.Pickup === false ? "No" : "";
        }

        return text;
    }

    function generateIsSecondAccountColumn(user, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            var template = templateElements.isSecondAccount.clone();
            template.find('option[value="' + user.IsSecondAccount + '"]').attr("selected", "selected");

            text = template.html();
        } else {
            text = user.IsSecondAccount === true ? "Yes" : "No";
        }

        return text;
    }

    function buildLevelOptions(levelId, userId, levels) {
        var option = '';
        for (var i = 0; i < levels.length; i++) {
            var isSelected = levelId === levels[i].ResourceId ? 'selected' : '';
            option += '<option value="' + levels[i].ResourceId + '"' + isSelected + ' class="left">' + levels[i].Value + '</option>'
        }
        option += !levelId ? '<option selected value=""></option>' : '<option value=""></option>';
        var levels = '<select class="js-Level ' + 'level-' + userId + ' browser-default">' +
            option +
            '</select>';
        return levels;
    }

    function generateLevelColumn(user, permission, curSection, userSection, levels) {
        var text = '';
        if (checkPermissionUser(permission, curSection, userSection)) {
            var levelOptions = buildLevelOptions(user.Level, user.UserId, levels);
            text = '<div class="js-divLevel">' +
                '<div class="select-wrapper-default">' +
                levelOptions +
                ' </div >'
            '</div >';
        }
        else {
            var level = levels.find(x => x.ResourceId == user.Level);
            text = level ? level.Value : '';
        }
        return text;
    }

    function generateNoField(index, userId) {
        var className = classElementsInUserTable.userId.substr(1, classElementsInUserTable.userId.length);
        var text = index + '<input class="' + className + '" type="hidden" value="' + userId + '"/>';

        return text;
    }

    function generateInputField(value, jsClassName, maxlength, permission, curSection, userSection) {
        var text = "";
        if (checkPermissionUser(permission, curSection, userSection)) {
            if (value != null && value.length > 0) {
                text = '<input type="text" class="left readonly js-view tipsy-' +
                    jsClassName.substr(1, jsClassName.length) +
                    '" value="' +
                    value +
                    '" original-title="' +
                    value +
                    '"/>' +
                    '<input maxlength="' +
                    maxlength +
                    '" class="js-edit ' +
                    jsClassName.substr(1, jsClassName.length) +
                    '" type="text" value="' +
                    value +
                    '" style="display:none"/>' +
                    '<a class="left addIcon js-addIcon" href="javascript:;" style="display:none">Add</a>';
                if (jsClassName === classElementsInUserTable.email) {
                    text += '<input class="' +
                        jsClassName.substr(1, jsClassName.length) +
                        '_bk" type="hidden" value="' +
                        value +
                        '" />';
                }
                if (jsClassName === classElementsInUserTable.nickName) {
                    text += '<input class="' +
                        jsClassName.substr(1, jsClassName.length) +
                        '_bk" type="hidden" value="' +
                        value +
                        '" />';
                }
            } else {
                text = '<a class="left addIcon js-addIcon" href="javascript:;">Add</a>' +
                    '<input type="text" class="left readonly js-view tipsy-' +
                    jsClassName.substr(1, jsClassName.length) +
                    '" value="' +
                    value +
                    '"  original-title="' +
                    value +
                    '" style="display:none"/>' +
                    '<input maxlength="' +
                    maxlength +
                    '"  class="js-edit ' +
                    jsClassName.substr(1, jsClassName.length) +
                    '" style="display:none" type="text" />';
            }
        } else {
            value = value == null ? "" : value;
            text = '<input type="text" readonly class="readonly" value="' + value + '" />';
        }

        return text;
    }

    function generateAccountNameColumn(user) {
        var text = '<i class="icon icon-circle mdi mdi-account teal white-text lighten-3" aria-hidden="true"></i>';
        if (user.ProfilePicture != null && user.ProfilePicture.length > 0) {
            text = '<i class="icon icon-circle" aria-hidden="true">' +
                '<img src="' +
                user.ProfilePicture +
                '"/>' +
                "</i>";
        }

        return text + (user.UserName ? user.UserName : "");
    }

    function registerEventInputEmail() {
        $("#js-listUsers").find(classElementsInUserTable.email).on("blur",
            function () {
                var val = $(this).val(),
                    regex =
                        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
                if (val.length > 0) {
                    if (!regex.test(val)) {
                        $(this).addClass("invalid");
                        var errorMessage = invalidFormatEmail.val();
                        Swal.fire({
                            html: errorMessage,
                            type: "error",
                            animation: false,
                            heightAuto: false
                        });
                    } else {
                        $(this).removeClass("invalid");
                    }
                } else {
                    $(this).removeClass("invalid");
                }
            });
    }

    function registerEventInputNickName() {
        $("#js-listUsers").find(classElementsInUserTable.nickName).on("blur",
            function () {
                var val = $(this).val();
                if (val.length > 0) {
                    if (val.indexOf(" ") >= 0) {
                        Swal.fire({
                            html: "Nickname cannot contain a space",
                            type: "error",
                            animation: false,
                            heightAuto: false
                        });

                        $(this).addClass("invalid");
                    } else {
                        $(this).removeClass("invalid");
                    }

                    if (val.indexOf("<") >= 0) {
                        Swal.fire({
                            html: "Nickname cannot contain special characters",
                            type: "error",
                            animation: false,
                            heightAuto: false
                        });

                        $(this).addClass("invalid");
                    }
                }
            });
    }

    function onClickJsView($object) {
        var parent = $($object).parent();
        parent.find(".js-edit").show();
        parent.find(".js-edit").select();

        $($object).hide();
    }

    function registerEventForInputField() {
        registerEventInputEmail();
        registerEventInputNickName();
        $("#js-listUsers .js-view").on("click select",
            function () {
                onClickJsView(this);
            });

        $("#js-listUsers .js-addIcon").on("click",
            function () {
                $(this).hide();

                var parent = $(this).parent();
                parent.find(".js-edit").show();
                parent.find(".js-edit").focus();
            });

        $("#js-listUsers .js-edit").on("keyup",
            function (e) {
                var code = e.which;
                // Enter, Escape
                if (code === 13 || code === 27) {
                    $(e.target).blur();
                    return;
                }
            });

        $("#js-listUsers .js-edit").on("blur",
            function () {
                if (!$(this).hasClass("invalid")) {
                    $(".tipsy").remove();
                    registerSaveEvent($(this));
                }
            });
    }

    function registerEventLocation() {
        $("#js-listUsers select").material_select();

        $("#js-listUsers select").on("change",
            function () {
                registerSaveEvent($(this));
            });

        domElements.itemperpageOption.on("change",
            function () {
                var oldValue = parseInt(domElements.formFilter.find("#PageSize").val()),
                    newValue = parseInt($(this).val());

                if (oldValue !== newValue) {
                    domElements.formFilter.find("#PageIndex").val(1);
                    domElements.formFilter.find("#PageSize").val(newValue);

                    renderUsersTable();
                }
            });
    }

    function registerEventForUserTable() {
        registerEventLocation();

        registerEventForInputField();

        domElements.tblUsers.find(".grid-container").on("scroll",
            function () {
                var left = $(this).scrollLeft();

                domElements.tblUsers.find(".col_header").prop("scrollLeft", left);
                domElements.tblUsers.find(".x-scrollbar").prop("scrollLeft", left);
            });

        for (var i = 0; i < arrayUsers.length; i++) {
            var userItem = arrayUsers[i];
            var position = i < arrayUsers.length - 3 ? "bottom" : "top";
            if (arrayUsers.length < 6) {
                position = "bottom";
            }

            $("#" + userItem.divId).find("select").multipleSelect({
                'position': position,

                formatAllSelected: function () { return null; }
            });
        }
    }

    function generateColumnHeaders(response) {
        var columnHeaders = [
            { HeaderText: "No", Width: 35, Name: "No", HeaderAlign: "center", CellAlign: "center" },
        ];
        var length = response.UserColumnModels.length;
        for (var i = 0; i < length; i++) {
            var column = response.UserColumnModels[i];

            columnHeaders.push({
                HeaderText: column.HeaderText,
                Width: column.Width,
                Name: column.Name,
                HeaderAlign: column.HeaderAlign,
                CellAlign: column.CellAlign
            });
        }
        return columnHeaders;
    }

    function buildLevelBySection(responseData, sectionId) {
        switch (sectionId) {
            case 2:
            case 30:
                return responseData.LevelOfLiveAssistant;
                break;
            case 3:
                return responseData.LevelOfLiveTrading;
                break;
            default:
                return responseData.LevelOfOtherSection;
        }
    }

    function generateBodyRows(response) {
        arrayUsers = [];
        responseUser = response;
        var rows = [],
            rowIndex = (response.CurrentPage - 1) * response.ItemsPerPage;
        var totalColumn = response.UserColumnModels.length;
        for (var index = 0; index < response.Users.length; index++) {
            var user = response.Users[index];
            var levels = buildLevelBySection(response, user.SectionId);
            rowIndex++;

            var currentRow = {
                Columns: [
                    { Name: "No", Value: generateNoField(rowIndex, user.UserId) },
                ]
            };

            for (var col = 0; col < totalColumn; col++) {
                var column = response.UserColumnModels[col];

                switch (column.Name) {
                    case "EmployeeId":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.EmployeeId,
                                classElementsInUserTable.employeeId,
                                10,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "UserName":
                        currentRow.Columns.push({ Name: column.Name, Value: generateAccountNameColumn(user) });
                        break;
                    case "FullName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.FullName,
                                classElementsInUserTable.fullName,
                                100,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "NickName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.NickName,
                                classElementsInUserTable.nickName,
                                30,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "DepartmentName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateDepartmentColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "SectionName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateSectionColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "GroupName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateUserGroupColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "RoleName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateRoleColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "Extension":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.Extension,
                                classElementsInUserTable.extension,
                                30,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "Phone":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.Phone,
                                classElementsInUserTable.phone,
                                30,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "Email":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.Email,
                                classElementsInUserTable.email,
                                50,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "Skype":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.Skype,
                                classElementsInUserTable.skype,
                                50,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "CategoryName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateCategoryColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "LocationCode":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateLocationColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "LevelName":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateLevelColumn(user, column.Permission, column.Section, user.SectionName, levels)
                        });
                        break;
                    case "Pickup":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generatePickupColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "Address":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateInputField(user.Address,
                                classElementsInUserTable.address,
                                500,
                                column.Permission,
                                column.Section,
                                user.SectionName)
                        });
                        break;
                    case "IsSecondAccount":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateIsSecondAccountColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    case "Languages":
                        currentRow.Columns.push({
                            Name: column.Name,
                            Value: generateLanguageColumn(user, column.Permission, column.Section, user.SectionName)
                        });
                        break;
                    default:
                        break;
                }
            }

            rows.push(currentRow);
        }

        if (response.Users.length > 0 && response.Users.length < 6) {
            currentRow = {
                Columns: [
                    { Name: "No", Value: "" },
                ]
            };
            rows.push(currentRow);
            rows.push(currentRow);
            rows.push(currentRow);
            rows.push(currentRow);
        }
        return rows;
    }

    function renderUsersTable() {
        $(".loading-process").css("display", "inline");
        var model = domElements.formFilter.serialize();

        userManagementFactory.getUsers(model).success(function (response) {
            var columnHeaders = generateColumnHeaders(response);
            var gridOptions = {
                columns: columnHeaders,
                bodyRows: generateBodyRows(response),
                gridExpandHeight: 195,
                numberOfFrozenColumn: Math.min(3, columnHeaders.length),
                bodyRowHeight: 22,
                autoFixFrozenRowHeight: true,
                autoResizeColumn: true
            };

            if (!$("#js-listUsers").hasClass("freegrid")) {
                $("#js-listUsers").addClass("freegrid");
            }

            $("#js-listUsers").fanexGrid(gridOptions);
            initPagination(response);
            registerEventForUserTable();

            $(".loading-process").css("display", "none");
        }).error(function () {
            $(".loading-process").css("display", "none");
        });
    }

    function registerEvent() {
        domElements.searchBtn.on("click",
            function () {
                domElements.formFilter.find("#PageIndex").val(1);
                renderUsersTable();
            });

        domElements.searchTextbox.on("keypress",
            function (e) {
                if (e.which === 13) {
                    domElements.formFilter.find("#PageIndex").val(1);
                    renderUsersTable();
                }
            });

        domElements.syncBtn.on("click",
            function () {
                userManagementFactory.getSyncUserSimpleDataApi().success(function (response) {
                    if (response.length) {
                        var htmlText = '<p style="text-align: left; margin-bottom: 5px; font-weight: bold;">Find ' +
                            response.length +
                            " users </p>";
                        htmlText += '<table class="table-users-sync">';
                        htmlText +=
                            '<thead><tr><th style="background:#f1f1f1;"><b>OWP</b></th><th style="background:#f1f1f1; padding-left: 15px;"><b>Admin Site</b></th></tr></thead>';
                        htmlText += "<tbody>";
                        $.each(response,
                            function (key, item) {
                                htmlText += "<tr><td>" +
                                    item.OldUserName +
                                    "</td><td>" +
                                    item.NewUserName +
                                    "</td></tr>";
                            });
                        htmlText += "</tbody>";
                        htmlText += "</table>";
                        htmlText +=
                            '<p style="margin-top: 10px; font-size: 14px;">Are you sure you want to sync users from AdminSite to OWP?</p>';
                        Swal.fire({
                            html: htmlText,
                            animation: false,
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            showCancelButton: true,
                            reverseButtons: true
                        }).then((result) => {
                            if (result.value) {
                                domElements.syncBtn.attr("disabled", "disabled");
                                userManagementFactory.syncUser().success(function (response) {
                                    Swal.fire({
                                        type: "success",
                                        text: "Sync users successful",
                                        animation: false,
                                        onClose: () => {
                                            domElements.syncBtn.removeAttr("disabled");
                                            renderUsersTable();
                                        }
                                    });
                                }).error(function () {
                                    $(".loading-process").css("display", "none");
                                });
                            }
                        });
                    } else {
                        Swal.fire({
                            type: "info",
                            text: "Not found any user to sync",
                            animation: false
                        });
                    }
                }).error(function () {
                    $(".loading-process").css("display", "none");
                });
            });
    }

    function showTooltipAddress() {
        $(".tipsy-js-Address").tipsy({
            html: false,
            gravity: "e"
        });
    }

    const isUseFrozen = true;

    function registerSaveEvent($object) {
        var row = $object.closest("tr");

        var employeeId = row.find(classElementsInUserTable.employeeId).val();

        if (isUseFrozen) {
            var $tr = $object.parent().parent().parent();
            const rowIndex = $tr.attr("data-row-index");

            if (rowIndex) {
                var $trOnFrozenTable = $("#tblContent_js-listUsers tr[data-row-index='" + rowIndex + "']");
                $trOnFrozenTable.find(classElementsInUserTable.employeeId).val(employeeId);
                row = $trOnFrozenTable;
            }
        }

        var userId = row.find(classElementsInUserTable.userId).val();

        var getSelectedValue = $object.val();

        var getSelectedClass = $object.attr("class");
        getSelectedClass = getSelectedClass.replace("js-edit", "").trim();
        getSelectedClass = getSelectedClass.replace("browser-default", "").trim();
        getSelectedClass = getSelectedClass.replace("level-" + userId, "").trim();

        getSelectedClass = "." + getSelectedClass;

        var getColumnName = "";
        switch (getSelectedClass) {
            case classElementsInUserTable.fullName:
                getColumnName = "FullName";
                break;
            case classElementsInUserTable.nickName:
                getColumnName = "NickName";
                var nickName = row.find(classElementsInUserTable.nickName);
                if (nickName.hasClass("invalid")) {
                    getSelectedValue = row.find(classElementsInUserTable.nickNameBK);
                }
                break;
            case classElementsInUserTable.nickNameBK:
                break;
            case classElementsInUserTable.employeeId:
                getColumnName = "EmployeeId";
                break;
            case classElementsInUserTable.extension:
                getColumnName = "Extension";
                break;
            case classElementsInUserTable.phone:
                getColumnName = "Phone";
                break;
            case classElementsInUserTable.email:
                getColumnName = "Email";

                var email = row.find(classElementsInUserTable.email);
                if (email.hasClass("invalid")) {
                    getSelectedValue = row.find(classElementsInUserTable.emailBK);
                }
                break;
            case classElementsInUserTable.emailBK:
                break;
            case classElementsInUserTable.skype:
                getColumnName = "Skype";
                break;
            case classElementsInUserTable.userId:
                break;
            case classElementsInUserTable.roleId:
                getColumnName = "RoleId";
                break;
            case classElementsInUserTable.departmentId:
                getColumnName = "DepartmentId";
                break;
            case classElementsInUserTable.sectionId:
                getColumnName = "SectionId";
                break;
            case classElementsInUserTable.groupId:
                getColumnName = "GroupId";
                break;
            case classElementsInUserTable.categoryId:
                getColumnName = "CategoryId";
                break;
            case classElementsInUserTable.locationCode:
                getColumnName = "LocationCode";
                break;
            case classElementsInUserTable.pickup:
                getColumnName = "Pickup";
                break;
            case classElementsInUserTable.address:
                getColumnName = "Address";
                break;
            case classElementsInUserTable.level:
                getColumnName = "Level";
                break;
            case classElementsInUserTable.isSecondAccount:
                getColumnName = "IsSecondAccount";
                break;
            case classElementsInUserTable.language:
                getColumnName = "Language";
                break;
        }

        var criteria = {
            UserId: userId,
            Value: Array.isArray(getSelectedValue) ? getSelectedValue.join(",") : getSelectedValue,
            ColumnName: getColumnName
        };

        userManagementFactory.updateUser(criteria).success(function (response) {
            if (response.ErrCode > 0) {
                Swal.fire({
                    html: response.ErrMsg,
                    type: "error",
                    animation: false,
                });
            } else {
                var value = $($object).val();
                var parent = $($object).parent();
                var parseValue = parseInt(value);
                if (getColumnName == "SectionId") {
                    var userSelected = "select.level-" + userId;
                    var levels = buildLevelBySection(responseUser, parseValue);
                    var levelOptions = buildLevelOptions(null, userId, levels);
                    $(userSelected).replaceWith(levelOptions);
                    $("select.level-" + userId).on("change",
                        function () {
                            registerSaveEvent($(this));
                        });
                }
                
                if (value && value.length > 0) {
                    parent.find(".js-view").show();
                    parent.find(".js-view").val(value);
                    parent.find(".js-edit").hide();
                    parent.find(".tipsy-js-Address").attr("original-title", value);
                    if (value.length) {
                        showTooltipAddress();
                    }
                } else {
                    parent.find(".js-addIcon").show();
                    parent.find(".js-view").hide();
                    parent.find(".js-edit").hide();
                }
            }
        }).error(function (error) {
            var errorMessage = "An error occurred when saving, please try again.";
            Swal.fire({
                html: errorMessage,
                type: "error",
                animation: false,
            });

            Raven.captureMessage(JSON.stringify(error));
        });
        $(".tipsy").remove();
    }

    return {
        Initialize: function () {
            registerEvent();

            renderUsersTable();

            setInterval(() => {
                if ($(".tipsy-js-Address").val()) {
                    showTooltipAddress();
                }
            },
                3000);

            $("#btnExportToExcel").on("click",
                function () {
                    var model = domElements.formFilter.serialize();
                    var url = common.ResolveRootUrl("UserManagement/ExportToExcel");
                    window.location.href = url + "?" + model;
                });
        }
    };
}($);

$(document).ready(function () {
    userManagement.Initialize();
});