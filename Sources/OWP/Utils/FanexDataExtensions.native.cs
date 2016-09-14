namespace OWP.Utils
{
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using Fanex.Data.Repository;

    public static class FanexDataExtensions
    {
        public static void ThrowExceptionIfInvalid(this ICriteria criteria)
        {
            if (criteria.IsValid())
            {
                return;
            }

            var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent("Invalid criteria")
            };

            throw new HttpResponseException(resp);
        }
    }
}
