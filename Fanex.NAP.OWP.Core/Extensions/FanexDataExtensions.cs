namespace Fanex.NAP.OWP.Core.Extensions
{
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Criteria;
    using Data.Repository;
    using Fanex.NAP.OWP.Core.Model;

    public static class FanexDataExtensions
    {
        public static async Task<OWPCommandResult> ExecuteCommandAsync(this IDynamicRepository repository, CommandCriteria criteria)
        {
            await repository.ExecuteAsync(criteria).ConfigureAwait(false);
            if (criteria.ErrCode != 0)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(criteria.ErrMsg)
                };
                throw new HttpResponseException(resp);
            }

            return new OWPCommandResult
            {
                Code = 0,
                Message = criteria.ErrMsg
            };
        }
    }
}
