namespace OWP.Application.QuickSearch
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    [RoutePrefix("api/application/quicksearch")]
    public class QuickSearchController : ApiController
    {
        private readonly Repository repository;

        public QuickSearchController(Repository repository)
        {
            this.repository = repository;
        }

        [Route("")]
        [HttpPost]
        public async Task<IEnumerable<MatchInfoModel>> Query(QueryModel model)
        {
            return await repository.Query(model);
        }
    }
}