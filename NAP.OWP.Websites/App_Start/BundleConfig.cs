namespace NAP.OWP.Websites
{
    using global::OWP.MVC;
    using System.Diagnostics.CodeAnalysis;
    using System.Web.Optimization;

    [SuppressMessage("Minor Code Smell", "S1075:URIs should not be hardcoded", Justification = "<Pending>")]
    public static class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterCommonBundles(bundles);
            RegisterEventManagementBundles(bundles);
            RegisterSignalRBundles(bundles);
            RegisterTaskSchedulingBundles(bundles);
            RegisterUserManagementBundles(bundles);
            RegisterWeeklyWorkingShiftBundles(bundles);
            RegisterDailyWorkingShiftBundles(bundles);
            RegisterMaxBetManagementBundles(bundles);
            RegisterOddsCompilerBundles(bundles);
        }

        #region Common

        private static void RegisterCommonBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/styles/common")
                .Include("~/Content/Libraries/Fanex.Grid/Fanex.Grid.css", new CssVirtualPathRewriteUrlTransform())
                .Include("~/Content/Libraries/Fanex.Grid/Fanex.Pagination.css", new CssVirtualPathRewriteUrlTransform())
                .Include("~/Scripts/Libraries/fanex-multiselect/fanex.multiSelect.css", new CssVirtualPathRewriteUrlTransform())
                .Include(
                "~/Content/Libraries/Materialize/materialize.css",
                "~/Content/Libraries/CustomScrollbar/jquery.mCustomScrollbar.css",
                "~/Content/Libraries/Chosen/bootstrap-chosen.css",
                "~/Content/Libraries/Select2/select2.min.css",
                "~/Content/Libraries/jQuery-Wizard/wizard.css",
                "~/Content/Libraries/Tipsy/tipsy.css",
                "~/Content/Libraries/Colpick/colpick.css",
                "~/Content/Libraries/SweetAlert2/sweetalert2.css",
                "~/Content/Libraries/jQueryTagsinput/jquery.tagsinput.min.css",
                "~/Content/Libraries/jquery-timepicker/jquery.timepicker.css",
                "~/Content/Libraries/MsgBox/msgbox-0.0.1.css",
                "~/Scripts/Libraries/fanex-multiselect/fanex.multiSelect.css",
                "~/Content/Libraries/SimplePagination/simplePagination.css",
                "~/Content/Libraries/Toastr/toastr.css",
                "~/Content/owp.search-autocomplete.css",
                "~/src/scss/css/copy.css",
                "~/Content/Themes/main.css"));

            bundles.Add(new StyleBundle("~/styles/fonts")
               .Include(
               "~/Content/fonts/icon-OWP/style.css"
               ));

            bundles.Add(new ScriptBundle("~/scripts/core").Include(
                "~/Scripts/Libraries/jQuery/jquery-2.1.1.js",
                "~/Scripts/jquery.signalR-2.4.3.min.js"));

            bundles.Add(new ScriptBundle("~/scripts/common").Include(
                        "~/Scripts/Libraries/JQuery/jquery-ui-1.10.4.js",
                        "~/Scripts/Libraries/JQuery/jquery.blockUI.2.66.min.js",
                        "~/Scripts/Libraries/Others/moment-latest.js",
                        "~/Scripts/Libraries/Chosen/chosen.jquery.js",
                        "~/Scripts/Libraries/MsgBox/msgbox-0.0.1.js",
                        "~/Scripts/Libraries/jquery-timepicker/jquery.timepicker.js",
                        "~/Scripts/Libraries/Others/namespace.js",
                        "~/Scripts/Libraries/js.cookie/js.cookie.js",
                        "~/Scripts/Site/common.js",
                        "~/Scripts/Libraries/Materialize/materialize.js",
                        "~/Scripts/Libraries/CustomScrollbar/jquery.mCustomScrollbar.concat.min.js",
                        "~/Scripts/Libraries/Select2/select2.min.js",
                        "~/Scripts/Libraries/jQuery-Wizard/jquery-wizard.js",
                        "~/Scripts/Libraries/Tipsy/jquery.tipsy.js",
                        "~/Scripts/Libraries/jQueryTagsinput/jquery.tagsinput.min.js",
                        "~/Scripts/Libraries/Inputmask/jquery.inputmask.bundle.js",
                        "~/Scripts/Libraries/jquery.shiftcheckbox.js",
                        "~/Scripts/Libraries/Colpick/colpick.js",
                        "~/Scripts/Libraries/SweetAlert2/sweetalert2.js",
                        "~/Scripts/Libraries/Fanex.Grid/Fanex.Grid.js",
                        "~/Scripts/Libraries/Fanex.Grid/Fanex.Pagination.js",
                        "~/Scripts/Libraries/SimplePagination/jquery.simplePagination.js",
                        "~/Scripts/Libraries/ContextMenu/bootstrap-contextmenu.js",
                        "~/Scripts/Libraries/fanex-multiselect/fanex.multiSelect.js",
                        "~/Scripts/Libraries/Toastr/toastr.js",
                        "~/Scripts/Libraries/Sortable/Sortable.js",
                        "~/Scripts/Libraries/favico/favico-0.3.10.min.js",
                        "~/Scripts/Site/navbar.js",
                        "~/Scripts/Site/main.js",
                        "~/src/js/modernizr.js",
                        "~/Areas/TaskScheduling/Resources/EventAssignment/event-assignment-notification.js",
                        "~/Areas/Copy/copy.js",
                        "~/Scripts/Site/owp.search-autocomplete.js")
                    .IncludeDirectory("~/Areas/EventManagement/Resources/QuickSearch", "*.js", true)
                    .IncludeDirectory("~/Areas/MessageMachine/Resources/MessageBox", "*.js", true)
                    .IncludeDirectory("~/Areas/DocumentTitle", "*.js", true));
        }

        #endregion Common
        #region SignalR
        private static void RegisterSignalRBundles(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/scripts/signalR")
                .Include("~/Areas/SignalR/pushNotification.js",
                "~/Areas/SignalR/signalRNetcore.js",
                "~/Areas/SignalR/signalrNetFw.js"));
        }
        #endregion
        #region Event-Management

        private static void RegisterEventManagementBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Styles/EventInformation").Include(
                "~/src/scss/css/EventInformation.css",
                "~/src/scss/css/TaskList.css"));

            bundles.Add(new ScriptBundle("~/scripts/recommend-odds").Include(
                "~/Areas/EventManagement/Resources/RecommendOdds/recommend-odds-factory.js",
                "~/Areas/EventManagement/Resources/RecommendOdds/recommend-odds-service.js",
                "~/Areas/EventManagement/Resources/RecommendOdds/recommend-odds.js"));

            bundles.Add(new ScriptBundle("~/Scripts/EventInformation").Include(
                "~/Scripts/Libraries/jquery.floatThead/jquery.floatThead.min.js",
                "~/Areas/TaskScheduling/Resources/TaskList/task-list-factory.js",
                "~/Areas/EventManagement/Resources/EventInformation/event-information-factory.js",
                "~/Areas/EventManagement/Resources/EventInformation/event-information.js",
                "~/Areas/EventManagement/Resources/Filter/filter-factory.js",
                "~/Areas/EventManagement/Resources/Filter/filter.js"));
        }

        #endregion Event-Management

        #region Task-Scheduling

        private static void RegisterTaskSchedulingBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Styles/EventAssignment").Include(
                "~/Areas/TaskScheduling/Resources/EventAssignment/EventAssignment.css"));

            bundles.Add(new StyleBundle("~/TaskList").Include(
                "~/src/scss/css/TaskList.css"));

            bundles.Add(new ScriptBundle("~/scripts/task-list").Include(
                "~/Scripts/Libraries/jquery.floatThead/jquery.floatThead.min.js",
                "~/Areas/TaskScheduling/Resources/TaskList/task-list-factory.js",
                "~/Areas/TaskScheduling/Resources/TaskList/task-list.js"));

            bundles.Add(new ScriptBundle("~/Scripts/EventPicking").Include(
                "~/Areas/TaskScheduling/Resources/EventPicking/event-picking-factory.js",
                "~/Areas/EventManagement/Resources/EventInformation/event-information-factory.js",
                "~/Areas/TaskScheduling/Resources/EventPicking/event-picking.js"));
        }

        #endregion Task-Scheduling

        private static void RegisterUserManagementBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/UserManagement").Include(
               "~/Scripts/Libraries/MultipleSelect/multiple-select.js",
                "~/src/pages/user-management/user-management-factory.js",
               "~/src/pages/user-management/user-management.js"));

            bundles.Add(new StyleBundle("~/Styles/UserManagement").Include(
               "~/src/pages/user-management/user-management.css"));
        }

        private static void RegisterWeeklyWorkingShiftBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/WeeklyWorkingShift/IFrame").Include(
                "~/Scripts/Libraries/jQuery/jquery-2.1.1.min.js",
                "~/Scripts/Libraries/JQuery/jquery-ui-1.10.4.min.js",
                "~/Scripts/Libraries/MsgBox/msgbox-0.0.1.js",
                "~/Scripts/Site/owp.search-autocomplete.js",
                "~/Scripts/Site/common.js"));

            bundles.Add(new ScriptBundle("~/Scripts/WeeklyWorkingShift").Include(
                "~/src/pages/weekly-working-shift/week-picker.js",
               "~/src/pages/weekly-working-shift/working-shift-factory.js",
               "~/src/pages/weekly-working-shift/working-shift-service.js",
               "~/src/pages/weekly-working-shift/working-shift-weekly.js",
               "~/src/pages/weekly-working-shift/working-shift-upload.js",
               "~/src/pages/weekly-working-shift/working-shift.js"));

            bundles.Add(new StyleBundle("~/Styles/WeeklyWorkingShift").Include(
               "~/src/pages/weekly-working-shift/WorkingShift.css"));
        }

        private static void RegisterDailyWorkingShiftBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/DailyWorkingShift").Include(
                "~/src/pages/daily-working-shift/daily-working-shift.js",
                "~/src/pages/daily-working-shift/daily-working-shift-service.js"));

            bundles.Add(new StyleBundle("~/Styles/DailyWorkingShift").Include(
                "~/Content/Themes/main.css",
               "~/src/pages/daily-working-shift/DailyWorkingShift.css"));
        }

        private static void RegisterMaxBetManagementBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/MaxBetManagement").Include(
               "~/Areas/EventManagement/Resources/MaxBetManagement/max-bet-factory.js",
               "~/Areas/EventManagement/Resources/MaxBetManagement/max-bet-management.js",
               "~/Areas/EventManagement/Resources/MaxBetManagement/special-live-product-factory.js",
               "~/Areas/EventManagement/Resources/MaxBetManagement/special-live-product.js"));

            bundles.Add(new StyleBundle("~/Styles/MaxBetManagement").Include(
               "~/Areas/EventManagement/Resources/MaxBetManagement/MaxBetManagement.css"));
        }

        private static void RegisterOddsCompilerBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/OddsCompiler").Include(
               "~/Areas/EventManagement/Resources/OddsCompiler/odds-compiler.js",
               "~/Areas/EventManagement/Resources/OddsCompiler/odds-compiler-factory.js"));

            bundles.Add(new StyleBundle("~/Styles/OddsCompiler").Include(
               "~/Areas/EventManagement/Resources/OddsCompiler/OddsCompiler.css"));
        }
    }
}